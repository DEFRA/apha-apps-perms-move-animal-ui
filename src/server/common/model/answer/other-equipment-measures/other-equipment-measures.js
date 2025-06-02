import { escapeMarkdown } from '../../../helpers/escape-text.js'
import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ otherEquipmentMeasures: string }} OtherEquipmentMeasuresPayload
 */

/**
 * @augments {TextAreaAnswer<OtherEquipmentMeasuresPayload>}
 */
export class OtherEquipmentMeasuresAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'otherEquipmentMeasures',
    rows: 6,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter what other measures are in place to clean and disinfect equipment to reduce the risk of spreading TB'
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
