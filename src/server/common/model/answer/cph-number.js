import Joi from 'joi'
import { validateAgainstSchema, AnswerModel } from './answer-model.js'

const cphNumberRegex = /^([0-9]{2})\/([0-9]{3})\/([0-9]{4})$/i

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
 * @import {RawPayload} from './answer-model.js'
 */

export class CphNumber extends AnswerModel {
  /**
   * @returns {string | undefined}
   */
  get value() {
    return this._data?.cphNumber
  }

  /**
   * @returns {CphNumberData}
   */
  toState() {
    return this.value?.replace(/\s+/g, '') ?? ''
  }

  validate() {
    return validateAgainstSchema(cphNumberPayloadSchema, this._data)
  }

  /**
   * @param {CphNumberData | undefined} state
   * @returns {CphNumber}
   */
  static fromState(state) {
    return new CphNumber(state !== undefined ? { cphNumber: state } : {})
  }
}
