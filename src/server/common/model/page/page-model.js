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

  /** @type {boolean} */
  overrideRedirects = false

  /** @returns {string} */
  get heading() {
    return this.pageHeading
  }

  /** @returns {string} */
  get title() {
    return this.pageTitle
  }

  /**
   * @param {import('@hapi/hapi').Request} req
   * @returns {Record<string, unknown>}
   * */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  viewProps(_req) {
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
