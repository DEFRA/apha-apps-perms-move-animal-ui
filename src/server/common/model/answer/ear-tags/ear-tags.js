import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * export @typedef {string} EarTagsData
 * @typedef {{ earTags: string }} EarTagsPayload
 */

/**
 * @augments {TextAreaAnswer<EarTagsPayload>}
 */
export class EarTagsAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'earTags',
    rows: 10,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter the ear tag numbers of the animals you are planning to move'
      }
    }
  }
}
