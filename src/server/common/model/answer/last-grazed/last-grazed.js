import { TextAnswer } from '../text/text.js'

/** @import {TextConfig} from '../text/text.js' */

/**
 * @typedef {{ lastGrazed: string }} LastGrazedPayload
 */

/**
 * @augments {TextAnswer<LastGrazedPayload>}
 */
export class LastGrazedAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'lastGrazed',
    characterWidth: 10,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: { message: 'Enter when the field was last grazed by cattle' }
    }
  }
}
