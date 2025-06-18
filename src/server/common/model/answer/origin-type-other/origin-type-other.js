import { TextAnswer } from '../text/text.js'

/** @import {TextConfig} from '../text/text.js' */

/**
 * @typedef {{ originTypeOther: string }} OriginTypeOtherPayload
 */

/**
 * @augments {TextAnswer<OriginTypeOtherPayload>}
 */
export class OriginTypeOtherAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'originTypeOther',
    characterWidth: 20,
    validation: {
      empty: {
        message: 'Enter the premises type'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      }
    }
  }
}
