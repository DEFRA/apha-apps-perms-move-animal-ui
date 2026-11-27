import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import {
  resolveValidationMessage,
  validateAnswerAgainstSchema
} from '../validation.js'

/** @import { AnswerViewModelOptions } from '../answer-model.js' */

const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i

const maxLength = 255

/** @param {string} key */
const maxLengthMessage = (key) =>
  `${key} must be no longer than ${maxLength} characters`

/**
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.StringSchema}
 */
const createAddressLine1Schema = (translate) => {
  const required = resolveValidationMessage(
    {
      message: 'Enter address line 1, typically the building and street',
      i18nKey: 'common.answer.address.validation.addressLine1'
    },
    translate
  )

  return Joi.string()
    .required()
    .trim()
    .max(maxLength)
    .messages({
      'any.required': required,
      'string.empty': required,
      'string.max': resolveValidationMessage(
        {
          message: maxLengthMessage('Address line 1'),
          i18nKey: 'common.answer.address.validation.addressLine1MaxLength'
        },
        translate
      )
    })
}

/**
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.StringSchema}
 */
const createAddressLine2Schema = (translate) =>
  Joi.string()
    .allow('')
    .max(maxLength)
    .messages({
      'string.max': resolveValidationMessage(
        {
          message: maxLengthMessage('Address line 2'),
          i18nKey: 'common.answer.address.validation.addressLine2MaxLength'
        },
        translate
      )
    })

/**
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.StringSchema}
 */
const createAddressTownSchema = (translate) => {
  const required = resolveValidationMessage(
    {
      message: 'Enter town or city',
      i18nKey: 'common.answer.address.validation.townOrCity'
    },
    translate
  )

  return Joi.string()
    .required()
    .trim()
    .max(maxLength)
    .messages({
      'any.required': required,
      'string.empty': required,
      'string.max': resolveValidationMessage(
        {
          message: maxLengthMessage('Address town'),
          i18nKey: 'common.answer.address.validation.townOrCityMaxLength'
        },
        translate
      )
    })
}

/**
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.StringSchema}
 */
const createAddressCountySchema = (translate) =>
  Joi.string()
    .allow('')
    .max(maxLength)
    .messages({
      'string.max': resolveValidationMessage(
        {
          message: maxLengthMessage('Address county'),
          i18nKey: 'common.answer.address.validation.countyMaxLength'
        },
        translate
      )
    })

/**
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.StringSchema}
 */
const createPostcodeSchema = (translate) => {
  const required = resolveValidationMessage(
    {
      message: 'Enter postcode',
      i18nKey: 'common.answer.address.validation.postcode'
    },
    translate
  )

  return Joi.string()
    .required()
    .replace(' ', '')
    .pattern(postcodeRegex)
    .messages({
      'any.required': required,
      'string.empty': required,
      'string.pattern.base': resolveValidationMessage(
        {
          message: 'Enter a full UK postcode',
          i18nKey: 'common.answer.address.validation.postcodeFormat'
        },
        translate
      )
    })
}

/**
 * @param {AnswerViewModelOptions['translate']} [translate]
 * @returns {Joi.ObjectSchema}
 */
const createAddressPayloadSchema = (translate) =>
  Joi.object({
    addressLine1: createAddressLine1Schema(translate),
    addressLine2: createAddressLine2Schema(translate),
    addressTown: createAddressTownSchema(translate),
    addressCounty: createAddressCountySchema(translate),
    addressPostcode: createPostcodeSchema(translate)
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
  get type() {
    const type = 'address'
    return type
  }

  /**
   * @returns {AddressData | undefined}
   */
  get value() {
    const trimmedValues = Object.fromEntries(
      Object.entries(this._data ?? {})
        .map(([key, value]) => [key, value?.trim()])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== '')
    )

    return Object.keys(trimmedValues).length === 0 ? undefined : trimmedValues
  }

  get displayText() {
    return Object.values(this.value ?? [])
      .filter((line) => line.trim().length > 0)
      .map((line) => line.trim())
      .join('\n')
  }

  get template() {
    return 'model/answer/address/address.njk'
  }

  /**
   * @returns {AddressData | undefined}
   */
  toState() {
    return this.value
  }

  /**
   * @param {AnswerViewModelOptions['translate']} [translate]
   */
  validate(translate) {
    return validateAnswerAgainstSchema(
      createAddressPayloadSchema(translate),
      this._data ?? {}
    )
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  async viewModel({ validate, question, translate }) {
    const viewModel = { value: this.value, question }

    if (validate) {
      viewModel.errors = this.validate(translate).errors
    }

    return Promise.resolve(viewModel)
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
