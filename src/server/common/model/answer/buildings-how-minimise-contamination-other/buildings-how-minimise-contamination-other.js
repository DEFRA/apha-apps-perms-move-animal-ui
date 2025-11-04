import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ buildingsHowMinimiseContaminationOther: string }} BuildingsHowMinimiseContaminationOtherPayload
 */

/**
 * @augments {TextAreaAnswer<BuildingsHowMinimiseContaminationOtherPayload>}
 */
export class BuildingsHowMinimiseContaminationOtherAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'buildingsHowMinimiseContaminationOther',
    rows: 8,
    isPageHeading: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter what other measures are being taken to reduce the spread of TB during housing'
      }
    }
  }
}
