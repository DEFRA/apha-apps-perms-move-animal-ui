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
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: { message: 'Enter when the field was last grazed by cattle' }
    }
  }
}
