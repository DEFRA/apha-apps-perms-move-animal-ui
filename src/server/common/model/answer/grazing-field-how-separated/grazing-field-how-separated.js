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
    hint: 'Include the types of fencing you use and distances between them',
    rows: 8,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter information about how this grazing field is separated from the resident herd'
      }
    }
  }
}
