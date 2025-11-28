import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import SummaryPage from '~/src/server/common/model/page/summary-page/SummaryPageModel.js'
import { HiddenAnswer } from '../../answer/hidden/hidden.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

/**
 * @import { Page } from '~/src/server/common/model/page/page-model.js'
 * @import {AnswerModel} from '~/src/server/common/model/answer/answer-model.js'
 * @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js'
 */

/**
 * @typedef {{ kind: 'NonQuestion', page: Page }} NonQuestionPageAnswer
 * @typedef {{ kind: 'Question', page: QuestionPage, answer: AnswerModel }} QuestionPageAnswer
 * @typedef { (NonQuestionPageAnswer | QuestionPageAnswer)[] } SectionPayload
 */

/**
 * @typedef {{
 *  key: string,
 *  title: string,
 *  plugin: ServerRegisterPluginObject<void>,
 *  summaryLink: string,
 *  isEnabled: (app: RawApplicationState) => boolean,
 *  isVisible: (app: RawApplicationState) => boolean
 * }} SectionConfig
 */

/**
 * export @typedef {{ isValid: boolean, firstInvalidPage?: QuestionPage }} SectionValidation
 */

export class SectionModel {
  /** @type {SectionPayload} */
  _data

  /** @type {SectionConfig} */
  static config

  /**
   * @returns {SectionConfig}
   */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  /**
   * @type {(RawApplicationState) => QuestionPage}
   */
  static firstPageFactory

  _getFirstPage(applicationState) {
    return /** @type {typeof SectionModel} */ (
      this.constructor
    ).firstPageFactory(applicationState)
  }

  /**
   * @param {SectionPayload} data
   */
  constructor(data) {
    this._data = data
  }

  /**
   * @returns {QuestionPageAnswer[]}
   */
  get _questionPageAnswers() {
    return this._data.filter((p) => p.kind === 'Question')
  }

  /** @returns {SectionValidation} */
  validate() {
    const finalPage = this._data.at(-1)?.page

    if (finalPage instanceof QuestionPage) {
      return { isValid: false, firstInvalidPage: finalPage }
    }

    if (finalPage instanceof ExitPage) {
      return {
        isValid: false,
        firstInvalidPage: this._questionPageAnswers.at(-1)?.page
      }
    }

    return { isValid: true }
  }

  /**
   * @param {RawApplicationState} data
   * @returns {SectionModel}
   */
  static fromState(data) {
    /** @type {SectionPayload} */
    const pages = []
    const sectionData = data[this.config.key]

    /** @type {Page} */
    let page = this.firstPageFactory(data)

    while (!(page instanceof ExitPage) && !(page instanceof SummaryPage)) {
      if (page instanceof QuestionPage) {
        const answer = page.Answer.fromState(
          sectionData?.[page.questionKey],
          data
        )
        pages.push({
          kind: 'Question',
          page,
          answer
        })
        if (!answer.validate().isValid) {
          break
        }
        page = page.nextPage(answer, data)
      } else {
        pages.push({ kind: 'NonQuestion', page })
        page = page.nextPage()
      }
    }

    if (!(page instanceof QuestionPage)) {
      pages.push({ kind: 'NonQuestion', page })
    }

    return new this(pages)
  }

  get sectionData() {
    const questionAnswers = this._questionPageAnswers
      .filter(({ answer, page }) => {
        return !(answer instanceof HiddenAnswer || page.isInterstitial)
      })
      .map((questionPageAnswer) => ({
        question: questionPageAnswer.page.question,
        questionKey: questionPageAnswer.page.questionKey,
        answer: questionPageAnswer.answer.data
      }))

    return {
      sectionKey: this.config.key,
      title: this.config.title,
      questionAnswers: questionAnswers
    }
  }

  /** @param {string} redirectUri */
  summaryViewModel(redirectUri) {
    return this._questionPageAnswers
      .filter(({ page }) => !page.isInterstitial)
      .map(({ page, answer }) => ({
        key: page.question,
        value: answer.html,
        url: `${page.urlPath}?returnUrl=${redirectUri}`,
        visuallyHiddenKey: page.question,
        attributes: {
          'data-testid': `${page.questionKey}-change-link`
        }
      }))
  }

  /**
   * @param {RawApplicationState} applicationState
   * @returns {object}
   */
  taskDetailsViewModel(applicationState) {
    const sectionValidity = this.validate()
    return {
      title: this.config.title,
      initialLink:
        sectionValidity.firstInvalidPage?.urlPath ??
        this._getFirstPage(applicationState).urlPath,
      summaryLink: this.config.summaryLink,
      isValid: sectionValidity.isValid,
      isEnabled: this.config.isEnabled(applicationState)
    }
  }
}
