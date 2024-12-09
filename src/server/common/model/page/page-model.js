/** @import { AnswerModelClass } from "../answer/answer-model.js"  */
/** @import { AnswerErrors } from "../answer/validation.js" */

import { NotImplementedError } from '../../helpers/not-implmented-error.js'

/**
 * @template Payload
 * @class Page<Payload>
 */
export class Page {
  get heading() {
    return this.question
  }

  get pageTitle() {
    return this.question
  }

  /** @type {string} */
  path

  /** @type {string} */
  question

  /** @type {string} */
  questionKey

  /** @type {string} */
  section

  /** @type {string} */
  view

  /** @type {AnswerModelClass<Payload>} */
  Answer

  // NOTE - this belongs on the answer,
  // once we move the view partial over to the answer
  /** @param {AnswerErrors} errors */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorMessages(errors) {
    throw new NotImplementedError()
  }

  /** @params {AnswerModel<Payload>} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    throw new NotImplementedError()
  }
}
