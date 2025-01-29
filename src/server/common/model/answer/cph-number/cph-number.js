import { TextAnswer } from '../text/text.js'
import Joi from 'joi'

/**
 * export @typedef {string} CphNumberData
 * @typedef {{ cphNumber: string }} CphNumberPayload
 */

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

const invalidCphNumberError =
  'Enter the CPH number in the correct format, for example, 12/345/6789'
const emptyCphNumberError = 'Enter the farm or premises CPH number'

/**
 * export @typedef {string} EmailAddressData
 * @typedef {{ emailAddress: EmailAddressData }} EmailAddressPayload
 */

/**
 * @extends {TextAnswer<CphNumberPayload>}
 */
export class CphNumberAnswer extends TextAnswer {
  static config = {
    payloadKey: 'cphNumber',
    stripWhitespace: true,
    validation: {
      maxLength: { value: 11, message: invalidCphNumberError },
      pattern: { regex: cphNumberRegex, message: invalidCphNumberError },
      empty: { message: emptyCphNumberError }
    }
  }
}
