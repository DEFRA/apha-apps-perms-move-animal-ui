import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ slurryManureOther: string }} SlurryManureOtherPayload
 */

/**
 * @augments {TextAreaAnswer<SlurryManureOtherPayload>}
 */
export class SlurryManureOtherAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'slurryManureOther',
    rows: 4,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter details on the other measures being taken to manage slurry and manure'
      }
    }
  }
}
