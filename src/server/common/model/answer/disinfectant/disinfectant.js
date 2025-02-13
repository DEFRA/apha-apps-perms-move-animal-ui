import { TextAnswer } from '../text/text.js'

/** @import { TextConfig } from '../text/text.js' */

/**
 * export @typedef {string} DisinfectantData
 * @typedef {{ disinfectant: string }} DisinfectantPayload
 */

/**
 * @augments {TextAnswer<DisinfectantPayload>}
 */
export class DisinfectantAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'disinfectant',
    autocomplete: 'disinfectant',
    characterWidth: 10,
    isPageHeading: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: { message: 'Enter what disinfectant you are using' }
    }
  }
}
