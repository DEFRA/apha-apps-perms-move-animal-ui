import Joi from 'joi'
import { validateAgainstSchema } from './model.js'
import { Model } from './model.js'

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
 * @import {RawPayload} from './model.js'
 */

export class CphNumber extends Model {
  /** @type {RawPayload | undefined} */
  _data

  /**
   * @param {RawPayload | undefined} data
   */
  constructor(data) {
    super()
    this._data = data

    Object.seal(this) // makes class immutable after instantiation
  }

  /**
   * @returns {string | undefined}
   */
  get value() {
    return this._data?.cphNumber
  }

  /**
   *
   * @returns {RawPayload}
   */
  toState() {
    return {
      cphNumber: this.value?.replace(/\s+/g, '') ?? ''
    }
  }

  validate() {
    return validateAgainstSchema(cphNumberPayloadSchema, this._data)
  }

  /**
   * @param {RawPayload | undefined} data
   * @returns {CphNumber}
   */
  static fromState(data) {
    return new CphNumber(data)
  }
}
