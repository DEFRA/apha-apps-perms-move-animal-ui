import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
/** @import {TextConfig} from '~/src/server/common/model/answer/text/text.js' */

/**
 * @typedef {{ fieldParcelNumber: string }} FieldParcelNumberPayload
 */

/**
 * @augments {TextAnswer<FieldParcelNumberPayload>}
 */
export class FieldParcelNumberAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'fieldParcelNumber',
    isPageHeading: false,
    characterWidth: 20,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      },
      empty: { message: 'Enter the field parcel number' }
    }
  }
}
