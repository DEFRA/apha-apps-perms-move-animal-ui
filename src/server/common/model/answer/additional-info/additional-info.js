import { escapeMarkdown } from '../../../helpers/escape-text.js'
import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ additionalInfo: string }} AdditionalInfoPayload
 */

/**
 * @augments {TextAreaAnswer<AdditionalInfoPayload>}
 */
export class AdditionalInfoAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'additionalInfo',
    rows: 10,
    validation: {
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
