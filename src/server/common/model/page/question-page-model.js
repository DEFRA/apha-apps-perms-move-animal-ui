/** @import { AnswerModel, AnswerModelClass } from '../answer/answer-model.js' */

import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { Page } from './page-model.js'

/**
 * @template AnswerPayload
 * @class QuestionPage<AnswerPayload>
 */
export class QuestionPage extends Page {
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
   * @returns {Page}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    throw new NotImplementedError()
  }
}
