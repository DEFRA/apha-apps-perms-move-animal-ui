import Joi from 'joi'
import { AnswerModel } from './answer-model.js'
import { validateAgainstSchema } from '../../helpers/validation/validation.js'

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
