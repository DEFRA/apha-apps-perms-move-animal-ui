import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'

export const receiveMethodPayloadSchema = Joi.object({
  receiveMethod: Joi.string().required().valid('email', 'post').messages({
    'any.required': 'Select how you would like this licence sent to you',
    'any.only': 'Select how you would like this licence sent to you'
  })
})

/**
 * export @typedef {string} ReceiveMethodData
 * @typedef {{ receiveMethod: string }} ReceiveMethodPayload
 */

/**
 * @augments AnswerModel<ReceiveMethodPayload>
 */
export class ReceiveMethodAnswer extends AnswerModel {
  /**
   * @returns {string | undefined}
   */
  get value() {
    return this._data?.receiveMethod
  }

  get html() {
    return this._data?.receiveMethod ?? ''
  }

  /**
   * @returns { ReceiveMethodData}
   */
  toState() {
    return this.value?.replace(/\s+/g, '') ?? ''
  }

  validate() {
    return validateAnswerAgainstSchema(
      receiveMethodPayloadSchema,
      this._data ?? {}
    )
  }

  _extractFields({ receiveMethod }) {
    return { receiveMethod }
  }

  /**
   * @param { ReceiveMethodData | undefined} state
   * @returns { ReceiveMethodAnswer}
   */
  static fromState(state) {
    return new ReceiveMethodAnswer(
      state !== undefined ? { receiveMethod: state } : undefined
    )
  }
}
