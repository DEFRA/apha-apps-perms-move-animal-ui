import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
import { QuestionPage } from '../../page/question-page-model.js'

/**
 * @import { Page } from '../../page/page-model.js'
 * @import {AnswerModel} from '../../answer/answer-model.js'
 */

/**
 * @typedef {{ page: QuestionPage, answer: AnswerModel }} PageAnswer
 * @typedef {{[key: string]: PageAnswer}} SectionPayload
 */

/**
 * @typedef {{ isValid: boolean, firstInvalidPage?: QuestionPage }} SectionValidation
 */

export class SectionModelUpdated {
  /** @type {SectionPayload} */
  _data

  /** @type {QuestionPage} */
  firstPage

  constructor(data) {
    this._data = data
  }

  get value() {
    return this._data
  }

  get pages() {
    const pages = []

    /** @type {QuestionPage} */
    let page = this._data[this.firstPage.questionKey].page

    while (page instanceof QuestionPage) {
      const currPage = this._data[page.questionKey]

      pages.push(page)

      page = /** @type {QuestionPage} */ (page.nextPage(currPage.answer))
    }

    return pages
  }

  /** @returns {SectionValidation} */
  validate() {
    const pages = this.pages

    if (pages.length === 0) {
      return { isValid: false, firstInvalidPage: this.firstPage }
    }

    for (const visitedPage of pages) {
      const { page, answer } = this._data[visitedPage.questionKey]
      if (!answer.validate().isValid) {
        return { isValid: false, firstInvalidPage: page }
      }
    }

    return { isValid: true }
  }

  /**
   * @param {object} _data
   * @returns {SectionModelUpdated}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromState(_data) {
    throw new NotImplementedError()
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
