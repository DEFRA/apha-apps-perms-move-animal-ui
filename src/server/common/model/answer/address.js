import Joi from 'joi'
import { AnswerModel } from './answer-model.js'
import { validateAnswerAgainstSchema } from './validation.js'

const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i

const maxLength = 255

/** @param {string} key */
const maxLengthMessage = (key) =>
  `${key} must be no longer than ${maxLength} characters`

const addressLine1Required =
  'Enter address line 1, typically the building and street'
const addressTownRequired = 'Enter town or city'
const postcodeRequired = 'Enter postcode'

const addressPayloadSchema = Joi.object({
  addressLine1: Joi.string()
    .required()
    .max(maxLength)
    .messages({
      'any.required': addressLine1Required,
      'string.empty': addressLine1Required,
      'string.max': maxLengthMessage('Address line 1')
    }),
  addressLine2: Joi.string()
    .allow('')
    .max(maxLength)
    .messages({
      'string.max': maxLengthMessage('Address line 2')
    }),
  addressTown: Joi.string()
    .required()
    .trim()
    .max(maxLength)
    .messages({
      'any.required': addressTownRequired,
      'string.empty': addressTownRequired,
      'string.max': maxLengthMessage('Address town')
    }),
  addressCounty: Joi.string()
    .allow('')
    .max(maxLength)
    .messages({
      'string.max': maxLengthMessage('Address county')
    }),
  addressPostcode: Joi.string()
    .required()
    .replace(' ', '')
    .pattern(postcodeRegex)
    .messages({
      'any.required': postcodeRequired,
      'string.empty': postcodeRequired,
      'string.pattern.base': 'Enter a full UK postcode'
    })
}).required()

/**
 * export @typedef {{
 *  addressLine1: string;
 *  addressLine2 ?: string;
 *  addressTown: string;
 *  addressCounty ?: string;
 *  addressPostcode: string;
 * }} AddressData
 */

/**
 * @augments AnswerModel<AddressData>
 */
export class Address extends AnswerModel {
  /**
   * @returns {AddressData | undefined}
   */
  get value() {
    return this._data
  }

  get html() {
    return Object.values(this.value ?? [])
      .filter((line) => line !== undefined)
      .filter((line) => {
        const trimmed = line.trim()
        return trimmed.length > 0
      })
      .join('<br />')
  }

  /**
   * @returns {AddressData | undefined}
   */
  toState() {
    return this.value
  }

  validate() {
    return validateAnswerAgainstSchema(addressPayloadSchema, this._data ?? {})
  }

  _extractFields({
    addressLine1,
    addressLine2,
    addressTown,
    addressCounty,
    addressPostcode
  }) {
    return {
      addressLine1,
      addressLine2,
      addressTown,
      addressCounty,
      addressPostcode
    }
  }

  /**
   * @param {AddressData | undefined} state
   * @returns {Address}
   */
  static fromState(state) {
    return new Address(state)
  }
}
