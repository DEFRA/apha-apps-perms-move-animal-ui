import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import sanitizeHtml from 'sanitize-html'

/** @import { AnswerViewModelOptions } from '../answer-model.js' */

const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i

const maxLength = 255

/** @param {string} key */
const maxLengthMessage = (key) =>
  `${key} must be no longer than ${maxLength} characters`

const addressLine1Required =
  'Enter address line 1, typically the building and street'
const addressTownRequired = 'Enter town or city'
const postcodeRequired = 'Enter postcode'

const sanitise = (value, helpers) => {
  const clean = sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {}
  })
  if (clean !== value) {
    // handle the sanitization
    return helpers.error('string.sanitized')
  }
  return clean
}

const addressPayloadSchema = Joi.object({
  addressLine1: Joi.string()
    .required()
    .custom(sanitise)
    .required()
    .trim()
    .max(maxLength)
    .messages({
      'any.required': addressLine1Required,
      'string.empty': addressLine1Required,
      'string.max': maxLengthMessage('Address line 1'),
      'string.sanitized': addressLine1Required
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
export class AddressAnswer extends AnswerModel {
  /**
   * @returns {AddressData | undefined}
   */
  get value() {
    const sanitisedValues = Object.fromEntries(
      Object.entries(this._data ?? {})
        .map(([key, value]) => [
          key,
          sanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {}
          })?.trim()
        ])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== '')
    )

    return Object.keys(sanitisedValues).length === 0
      ? undefined
      : sanitisedValues
  }

  get html() {
    return Object.values(this.value ?? [])
      .filter((line) => {
        const trimmed = line.trim()
        return trimmed.length > 0
      })
      .join('<br />')
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get template() {
    return 'model/answer/address/address.njk'
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

  /**
   * @param {AnswerViewModelOptions} options
   */
  viewModel({ validate, question }) {
    const viewModel = { value: this.value, question }

    if (validate) {
      viewModel.errors = this.validate().errors
    }

    return viewModel
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
      ...(addressLine2 !== undefined && { addressLine2 }),
      addressTown,
      ...(addressCounty !== undefined && { addressCounty }),
      addressPostcode
    }
  }

  /**
   * @param {AddressData | undefined} state
   * @returns {AddressAnswer}
   */
  static fromState(state) {
    return new AddressAnswer(state)
  }
}
