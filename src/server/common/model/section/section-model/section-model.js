import { QuestionPage } from '../../page/question-page-model.js'
import { ExitPage } from '../../page/exit-page-model.js'

/**
 * @import { Page } from '../../page/page-model.js'
 * @import {AnswerModel} from '../../answer/answer-model.js'
 */

/**
 * @typedef {{ kind: 'NonQuestion', page: Page }} NonQuestionPageAnswer
 * @typedef {{ kind: 'Question', page: QuestionPage, answer: AnswerModel }} QuestionPageAnswer
 * @typedef { (NonQuestionPageAnswer | QuestionPageAnswer)[] } SectionPayload
 */

/**
 * export @typedef {{ isValid: boolean, firstInvalidPage?: QuestionPage }} SectionValidation
 */

export class SectionModel {
  /** @type {SectionPayload} */
  _data

  /** @type {() => QuestionPage} */
  static firstPageFactory

  get firstPage() {
    return /** @type {any} */ (this.constructor).firstPageFactory()
  }

  /** @param {SectionPayload} data */
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
      const questionPageAnswers = this.questionPageAnswers
      return {
        isValid: false,
        firstInvalidPage: questionPageAnswers.at(-1)?.page
      }
    }

    return { isValid: true }
  }

  /**
   * @param {object} data
   * @returns {SectionModel}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromState(data) {
    /** @type {SectionPayload} */
    const pages = []

    /** @type {Page} */
    let page = this.firstPageFactory()

    while (page instanceof QuestionPage) {
      const answer = page.Answer.fromState(data?.[page.questionKey])
      pages.push({
        kind: 'Question',
        page,
        answer
      })
      if (!answer.validate().isValid) {
        break
      }

      page = page.nextPage(answer)
    }

    if (!(page instanceof QuestionPage)) {
      pages.push({ kind: 'NonQuestion', page })
    }

    return new this(pages)
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
