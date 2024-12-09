/** @import { AnswerModel, AnswerModelClass } from '../answer/answer-model.js' */

import { NotImplementedError } from '../../helpers/not-implemented-error.js'

/**
 * @template AnswerPayload
 * @class QuestionPage<AnswerPayload>
 */
export class QuestionPage {
  /** @type {string} */
  question

  /** @type {string} */
  questionKey

  /** @type {AnswerModelClass<AnswerPayload>} */
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
