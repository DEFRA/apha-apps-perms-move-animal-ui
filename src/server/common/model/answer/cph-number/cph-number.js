import { TextAnswer } from '../text/text.js'

const cphNumberRegex = /^(\d{2})\/(\d{3})\/(\d{4})$/i

const invalidCphNumberError =
  'Enter the CPH number in the correct format, for example, 12/345/6789'
const emptyCphNumberError = 'Enter the farm or premises CPH number'

/**
 * export @typedef {string} CphNumberData
 * @typedef {{ cphNumber: string }} CphNumberPayload
 */

/**
 * @augments {TextAnswer<CphNumberPayload>}
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
