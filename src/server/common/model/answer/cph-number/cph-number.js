import { config } from '~/src/config/config.js'
import { TextAnswer } from '../text/text.js'
import { matchCph } from '../../../helpers/cph-matching/index.js'

/** @import { TextConfig } from '../text/text.js' */
/** @import { Logger } from 'pino' */

export const cphNumberRegex = /^(\d{2})\/(\d{3})\/(\d{4})$/i

const invalidCphNumberError =
  'Enter the CPH number in the correct format, for example, 12/345/6789'
const emptyCphNumberError = 'Enter the farm or premises CPH number'
const unmatchedCphNumberError =
  'The CPH number you entered cannot be found. Check the number and try again'

/**
 * export @typedef {string} CphNumberData
 * @typedef {{ cphNumber: string }} CphNumberPayload
 */

/**
 * @augments {TextAnswer<CphNumberPayload>}
 */
export class CphNumberAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'cphNumber',
    stripWhitespace: true,
    autocomplete: 'cph-number',
    characterWidth: 10,
    hint: 'For example, 12/345/6789',
    validation: {
      maxLength: { value: 11, message: invalidCphNumberError },
      pattern: { regex: cphNumberRegex, message: invalidCphNumberError },
      empty: { message: emptyCphNumberError }
    }
  }

  /**
   * Blocks the user only when SAM says the CPH doesn't exist. If SAM is
   * unavailable, or the cphValidation feature flag is off, the user can
   * still progress.
   * @param {Logger} logger
   */
  async validateExternally(logger) {
    if (!config.get('featureFlags').cphValidation) {
      return { isValid: true, errors: {} }
    }

    const cph = String(this.toState())

    if ((await matchCph(cph, logger)) === 'not-matched') {
      return {
        isValid: false,
        errors: {
          [this.config.payloadKey]: { text: unmatchedCphNumberError }
        }
      }
    }

    return { isValid: true, errors: {} }
  }
}
