import Joi from 'joi'
import { validateAgainstSchema, Model } from '../model.js'

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
 * @import {RawPayload} from '../model.js'
 */

export class CphNumber extends Model {
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
    if (state) {
      return new CphNumber({
        cphNumber: state
      })
    } else {
      return new CphNumber({})
    }
  }
}
