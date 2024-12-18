import { NotImplementedError } from '../../helpers/not-implemented-error.js'
/** @import { AnswerModel } from '../answer/answer-model.js' */

export class Page {
  /** @type {string} */
  urlPath

  /** @type {string | null} */
  urlKey = null

  /** @type {string} */
  sectionKey

  /** @type {string} */
  key

  /** @type {string} */
  view

  /** @type {string} */
  pageHeading

  /** @type {string} */
  pageTitle

  /** @returns {string} */
  get heading() {
    return this.pageHeading
  }

  /** @returns {string} */
  get title() {
    return this.pageTitle
  }

  /** @returns {Record<string, unknown>} */
  get viewProps() {
    return {}
  }

  /**
   * @param {AnswerModel} [_answer]
   * @returns {Page }
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    throw new NotImplementedError()
  }
}
