import { escapeMarkdown } from '../../../helpers/escape-text.js'
import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ otherWildlifeMeasures: string }} OtherWildlifeMeasuresPayload
 */

/**
 * @augments {TextAreaAnswer<OtherWildlifeMeasuresPayload>}
 */
export class OtherWildlifeMeasuresAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'otherWildlifeMeasures',
    rows: 10,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter information what on other measures are you taking to reduce the risk of spreading TB'
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
