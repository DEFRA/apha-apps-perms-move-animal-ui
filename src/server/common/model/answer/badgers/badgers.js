import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ badgers: string }} BadgersPayload
 */

/**
 * @augments {TextAreaAnswer<BadgersPayload>}
 */
export class BadgersAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'badgers',
    rows: 8,
    isPageHeading: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter information on what measures you are taking to reduce the risk of infection from badgers and wildlife'
      }
    }
  }
}
