import { escapeMarkdown } from '../../../helpers/escape-text.js'
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

  get emailHtml() {
    const data = this._data?.[this.config.payloadKey]
    if (data.length === 0) {
      return 'None'
    }
    return escapeMarkdown(this.html)
  }
}
