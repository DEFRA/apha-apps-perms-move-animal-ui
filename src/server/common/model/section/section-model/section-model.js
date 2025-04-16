import { QuestionPage } from '../../page/question-page-model.js'
import { ExitPage } from '../../page/exit-page-model.js'
import { StateManager } from '../../state/state-manager.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { Request } from '@hapi/hapi' */

/**
 * @import { Page } from '../../page/page-model.js'
 * @import {AnswerModel} from '../../answer/answer-model.js'
 * @import {RawApplicationState} from '../../state/state-manager.js'
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

  getFirstPage(applicationState) {
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
  get questionPageAnswers() {
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
        firstInvalidPage: this.questionPageAnswers.at(-1)?.page
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

    while (page instanceof QuestionPage) {
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
    }

    if (!(page instanceof QuestionPage)) {
      pages.push({ kind: 'NonQuestion', page })
    }

    return new this(pages)
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @param {Request} req
   * @returns {object}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildGdsTaskDetails(req) {
    const sectionValidity = this.validate()
    const applicationState = new StateManager(req).toState()
    return {
      title: this.config.title,
      initialLink:
        sectionValidity.firstInvalidPage?.urlPath ??
        this.getFirstPage(applicationState).urlPath,
      summaryLink: this.config.summaryLink,
      isValid: sectionValidity.isValid,
      isEnabled: this.config.isEnabled(applicationState)
    }
  }
}

/**
 * import {Request} from '@hapi/hapi'
 */
