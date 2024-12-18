import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'

const cphNumberRegex = /^(\d{2})\/(\d{3})\/(\d{4})$/i

export const cphNumberPayloadSchema = Joi.object({
  cphNumber: Joi.string()
    .required()
    .replace(' ', '')
    .pattern(cphNumberRegex)
    .messages({
      'any.required': 'Enter the farm or premises CPH number',
      'string.empty': 'Enter the farm or premises CPH number',
      'string.pattern.base':
        'Enter the CPH number in the correct format, for example, 12/345/6789'
    })
})

/**
 * export @typedef {string} CphNumberData
 * @typedef {{ cphNumber: string }} CphNumberPayload
 */

/**
 * @augments AnswerModel<CphNumberPayload>
 */
export class CphNumberAnswer extends AnswerModel {
  /**
   * @returns {string | undefined}
   */
  get value() {
    return this._data?.cphNumber
  }

  get html() {
    return this._data?.cphNumber ?? ''
  }

  /**
   * @returns {CphNumberData}
   */
  toState() {
    return this.value?.replace(/\s+/g, '') ?? ''
  }

  validate() {
    return validateAnswerAgainstSchema(cphNumberPayloadSchema, this._data ?? {})
  }

  _extractFields({ cphNumber }) {
    return { cphNumber }
  }

  /**
   * @param {CphNumberData | undefined} state
   * @returns {CphNumberAnswer}
   */
  static fromState(state) {
    return new CphNumberAnswer(
      state !== undefined ? { cphNumber: state } : undefined
    )
  }
}
