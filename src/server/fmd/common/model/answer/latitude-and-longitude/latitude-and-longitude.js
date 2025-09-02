import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
/** @import {TextConfig} from '~/src/server/common/model/answer/text/text.js' */

/**
 * @typedef {{ latitudeAndLongitude: string }} LatitudeAndLongitudePayload
 */

/**
 * @augments {TextAnswer<LatitudeAndLongitudePayload>}
 */
export class LatitudeAndLongitudeAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'latitudeAndLongitude',
    isPageHeading: false,
    characterWidth: 20,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      },
      empty: { message: 'Enter the latitude and longitude measurements' }
    }
  }
}
