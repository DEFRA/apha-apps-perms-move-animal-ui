import { HiddenAnswer } from '../hidden/hidden.js'

/** @import {HiddenAnswerConfig} from '../hidden/hidden.js' */

/**
 * export @typedef {'yes'} BiosecurityObligationsData
 * @typedef {{ biosecurityObligationsAcknowledged: BiosecurityObligationsData }} BiosecurityObligationsPayload
 */

/**
 * @augments {HiddenAnswer<BiosecurityObligationsPayload>}
 */
export class BiosecurityObligationsAnswer extends HiddenAnswer {
  /** @type {HiddenAnswerConfig} */
  static config = {
    payloadKey: 'biosecurityObligationsAcknowledged',
    value: 'yes'
  }
}
