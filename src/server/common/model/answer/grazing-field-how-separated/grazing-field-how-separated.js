import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ grazingFieldHowSeparated: string }} GrazingFieldHowSeparatedPayload
 */

/**
 * @augments {TextAreaAnswer<GrazingFieldHowSeparatedPayload>}
 */
export class GrazingFieldHowSeparatedAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'grazingFieldHowSeparated',
    rows: 8,
    isPageHeading: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter information about how you will separate the incoming animals from the resident herd'
      }
    }
  }
}
