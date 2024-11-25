import Joi from 'joi'
import { validateAgainstSchema } from './model.js'

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
})

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
 * @implements {Model<AddressData>}
 */
class AddressModel {
  /** @param {RawPayload} payload */
  toState(payload) {
    return {
      addressLine1: payload.addressLine1 ?? '',
      addressLine2: payload.addressLine2 ?? '',
      addressTown: payload.addressTown ?? '',
      addressCounty: payload.addressCounty ?? '',
      addressPostcode: payload.addressPostcode ?? ''
    }
  }

  /**
   * @param {AddressData | undefined} data
   * @returns {RawPayload}
   */
  fromState(data) {
    return data ?? {}
  }

  /**
   * @param {RawPayload} data
   */
  validate(data) {
    return validateAgainstSchema(addressPayloadSchema, data)
  }
}

export const Address = new AddressModel()

/** @import {Model,RawPayload} from './model.js' */
