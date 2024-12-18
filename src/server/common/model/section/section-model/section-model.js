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
 * export @typedef {{ isValid: boolean, firstInvalidPage?: QuestionPage }} SectionValidation
 */

export class SectionModel {
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

  get _pages() {
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
    const pages = this._pages
    return pages[pages.length - 1]
  }

  /**
   * @returns {PageAnswer[]}
   */
  get questionPageAnswers() {
    return this.questionPages.map((page) => ({
      page,
      answer: this._data[page.questionKey].answer
    }))
  }

  /**
   * returns {QuestionPage[]}
   */
  get questionPages() {
    return this._pages.filter((p) => p instanceof QuestionPage)
  }

  /** @returns {SectionValidation} */
  validate() {
    const page = this.finalPage

    if (page instanceof QuestionPage) {
      return { isValid: false, firstInvalidPage: page }
    }

    if (page instanceof ExitPage) {
      const questionPages = this.questionPages
      return {
        isValid: false,
        firstInvalidPage: questionPages[questionPages.length - 1]
      }
    }

    return { isValid: true }
  }

  /**
   * @param {object} _data
   * @returns {SectionModel}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static fromState(_data) {
    throw new NotImplementedError()
  }

  /* eslint-enable @typescript-eslint/no-unused-vars */
}
