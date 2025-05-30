import { escapeMarkdown } from '../../../helpers/escape-text.js'
import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ otherStaffMeasures: string }} OtherStaffMeasuresPayload
 */

/**
 * @augments {TextAreaAnswer<OtherStaffMeasuresPayload>}
 */
export class OtherStaffMeasuresAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'otherStaffMeasures',
    rows: 6,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter what other measures staff are taking to reduce the risk of spreading TB'
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
