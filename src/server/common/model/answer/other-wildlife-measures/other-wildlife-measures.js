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
          'Enter information on what other measures are you taking to reduce the risk of spreading TB'
      }
    }
  }
}
