import Joi from 'joi'
import { AnswerModel } from './answer-model.js'
import { validateAgainstSchema } from '../../helpers/validation/validation.js'

const emailAddressRegex = /^[^@]+@[^@]+$/

const maxLength = 255
const emptyAddressError =
  'Enter the email address you would like the licence sent to'
const invalidAddressError =
  'Enter an email address in the correct format, like name@example.com'

export const emailAddressPayloadSchema = Joi.object({
  emailAddress: Joi.string()
    .required()
    .max(maxLength)
    .pattern(emailAddressRegex)
    .messages({
      'any.required': emptyAddressError,
      'string.empty': emptyAddressError,
      'string.max': invalidAddressError,
      'string.pattern.base': invalidAddressError
    })
})

/**
 * export @typedef {string} EmailAddressData
 * @import {RawPayload} from './answer-model.js'
 */

export class EmailAddress extends AnswerModel {
  /**
   * @returns {string | undefined}
   */
  get value() {
    return this._data?.emailAddress
  }

  /**
   * @returns {EmailAddressData}
   */
  toState() {
    return this.value?.replace(/\s+/g, '') ?? ''
  }

  validate() {
    return validateAgainstSchema(emailAddressPayloadSchema, this._data)
  }

  /**
   * @param {EmailAddressData | undefined} state
   * @returns {EmailAddress}
   */
  static fromState(state) {
    return new EmailAddress(state !== undefined ? { emailAddress: state } : {})
  }
}
