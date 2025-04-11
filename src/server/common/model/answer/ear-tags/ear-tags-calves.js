import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * export @typedef {string} EarTagsData
 * @typedef {{ earTags: string }} EarTagsPayload
 */

/**
 * @augments {TextAreaAnswer<EarTagsPayload>}
 */
export class EarTagsCalvesAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'earTags',
    isPageHeading: false,
    hint: 'You need to enter each ear tag number on a separate line',
    rows: 15,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter the ear tag numbers of the calves under 42 days old you are planning to move'
      }
    }
  }
}
