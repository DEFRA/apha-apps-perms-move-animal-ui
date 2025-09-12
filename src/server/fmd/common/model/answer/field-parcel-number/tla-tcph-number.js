import {
  CphNumberAnswer,
  cphNumberRegex
} from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
/** @import {TextConfig} from '~/src/server/common/model/answer/text/text.js' */

/**
 * @typedef {{ tlaOrTcphNumber: string }} TlaOrTcphNumberPayload
 */

const invalidTlaOrTcphNumberError =
  'Enter the TLA or tCPH number in the correct format, for example, 12/345/6789'
const emptyTlaOrTcphNumberError = 'Enter the TLA or tCPH number'

/**
 * @augments {TextAnswer<TlaOrTcphNumberPayload>}
 */
export class TlaOrTcphNumberAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    ...CphNumberAnswer.config,
    payloadKey: 'tlaOrTcphNumber',
    validation: {
      maxLength: { value: 11, message: invalidTlaOrTcphNumberError },
      pattern: { regex: cphNumberRegex, message: invalidTlaOrTcphNumberError },
      empty: { message: emptyTlaOrTcphNumberError }
    }
  }
}
