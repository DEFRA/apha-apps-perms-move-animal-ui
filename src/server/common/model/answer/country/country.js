import { TextAnswer } from '../text/text.js'
/** @import {TextConfig} from '../text/text.js' */

/**
 * @typedef {{ country: string }} CountryPayload
 */

/**
 * @augments {TextAnswer<CountryPayload>}
 */
export class CountryAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'country',
    characterWidth: 20,
    validation: {
      maxLength: {
        value: 255,
        message: 'Your answer must be no longer than 255 characters'
      },
      empty: { message: 'Enter which country the animals are coming from' }
    }
  }
}
