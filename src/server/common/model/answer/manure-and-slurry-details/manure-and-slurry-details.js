import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ manureAndSlurryDetails: string }} ManureAndSlurryDetailsPayload
 */

/**
 * @augments {TextAreaAnswer<ManureAndSlurryDetailsPayload>}
 */
export class ManureAndSlurryDetailsAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'manureAndSlurryDetails',
    hint: 'For example, preventing cattle access to stores and how manure or slurry is spread onto grazing fields to reduce TB risk to incoming cattle',
    rows: 8,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message: 'Enter how you will manage manure and slurry'
      }
    }
  }
}
