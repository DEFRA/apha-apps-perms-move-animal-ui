import {
  CphNumberAnswer,
  cphNumberRegex
} from '~/src/server/common/model/answer/cph-number/cph-number.js'

/** @import {TextConfig} from '~/src/server/common/model/answer/text/text.js' */
/** @import {AnswerValidationResult} from '~/src/server/common/model/answer/validation.js' */

const invalidTlaOrTcphNumberError =
  'Enter the TLA or tCPH number in the correct format, for example, 12/345/6789'
const emptyTlaOrTcphNumberError = 'Enter the TLA or tCPH number'

export class TlaOrTcphNumberAnswer extends CphNumberAnswer {
  /** @type {TextConfig} */
  static config = {
    ...super.config,
    payloadKey: 'tlaOrTcphNumber',
    validation: {
      maxLength: { value: 11, message: invalidTlaOrTcphNumberError },
      pattern: { regex: cphNumberRegex, message: invalidTlaOrTcphNumberError },
      empty: { message: emptyTlaOrTcphNumberError }
    }
  }

  /**
   * TLA and tCPH numbers are not matched against SAM
   * @returns {Promise<AnswerValidationResult>}
   */
  async validateExternally() {
    return Promise.resolve({ isValid: true, errors: {} })
  }
}
