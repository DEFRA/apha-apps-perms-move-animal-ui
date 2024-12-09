/** @import { AnswerModel } from '../answer/answer-model.js' */

import { NotImplementedError } from '../../helpers/not-implemented-error.js'

export class QuestionPage {
  /** @type {string} */
  question

  /** @type {string} */
  questionKey

  /** @type {AnswerModel} */
  Answer

  /** @returns {string} */
  get heading() {
    return this.question
  }

  /** @returns {string} */
  get title() {
    return this.question
  }

  /**
   * @param {AnswerModel} _answer
   * @returns string
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    throw new NotImplementedError()
  }
}
