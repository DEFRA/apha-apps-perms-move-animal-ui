import Joi from 'joi'
import { textAnswerFactory } from '../text/text.js'

/** @import {TextAnswer} from '../text/text.js' */

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
 * @typedef {{ emailAddress: EmailAddressData }} EmailAddressPayload
 */

/** @typedef {TextAnswer<EmailAddressPayload>} EmailAddressAnswerType */
/**
 * @type {typeof TextAnswer<EmailAddressPayload>}
 */
export const EmailAddressAnswer = textAnswerFactory('EmailAddressAnswer', {
  payloadKey: 'emailAddress',
  stripWhitespace: true,
  validation: {
    pattern: { regex: emailAddressRegex, message: invalidAddressError },
    maxLength: { value: maxLength, message: invalidAddressError },
    empty: { message: emptyAddressError }
  }
})
