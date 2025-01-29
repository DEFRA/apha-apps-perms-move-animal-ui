import Joi from 'joi'
import { TextAnswer } from '../text/text.js'

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

/**
 * @auguments {TextAnswer<EmailAddressPayload>}
 */
export class EmailAddressAnswer extends TextAnswer {
  static config = {
    payloadKey: 'emailAddress',
    stripWhitespace: true,
    validation: {
      pattern: { regex: emailAddressRegex, message: invalidAddressError },
      maxLength: { value: maxLength, message: invalidAddressError },
      empty: { message: emptyAddressError }
    }
  }
}
