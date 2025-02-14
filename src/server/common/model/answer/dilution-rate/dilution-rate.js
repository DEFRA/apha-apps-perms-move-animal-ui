import { TextAnswer } from '../text/text.js'

/** @import { TextConfig } from '../text/text.js' */

const wholeNumberRegex = /^\d+$/

/**
 * export @typedef {string} DilutionRateData
 * @typedef {{ dilutionRate: string }} DilutionRatePayload
 */

/**
 * @augments {TextAnswer<DilutionRatePayload>}
 */
export class DilutionRateAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'dilutionRate',
    autocomplete: 'dilutionRate',
    characterWidth: 2,
    hint: 'For example, 15',
    isPageHeading: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: { message: 'Enter the dilution rate' },
      pattern: { regex: wholeNumberRegex, message: 'Enter a number' }
    }
  }
}
