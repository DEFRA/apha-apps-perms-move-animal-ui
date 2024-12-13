import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
import { QuestionPage } from '../../page/question-page-model.js'
import { ExitPage } from '../../page/exit-page-model.js'

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

    /** @type {Page} */
    let page = this._data[this.firstPage.questionKey].page

    pages.push(page)

    while (page instanceof QuestionPage) {
      const currPage = this._data[page.questionKey]

      if (!currPage.answer.validate().isValid) {
        break
      }

      page = page.nextPage(currPage.answer)
      pages.push(page)
    }

    return pages
  }

  get finalPage() {
    return this.pages[this.pages.length - 1]
  }

  /**
   * returns {QuestionPage[]}
   */
  get questionPages() {
    return this.pages.filter((p) => p instanceof QuestionPage)
  }

  /** @returns {SectionValidation} */
  validate() {
    const page = this.finalPage
    const questionPages = this.questionPages

    if (page instanceof QuestionPage) {
      return { isValid: false, firstInvalidPage: page }
    }

    if (page instanceof ExitPage) {
      return {
        isValid: false,
        firstInvalidPage: questionPages[questionPages.length - 1]
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
