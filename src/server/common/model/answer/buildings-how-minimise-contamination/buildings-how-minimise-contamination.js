import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ buildingsHowMinimiseContamination: string }} BuildingsHowMinimiseContaminationPayload
 */

/**
 * @augments {TextAreaAnswer<BuildingsHowMinimiseContaminationPayload>}
 */
export class BuildingsHowMinimiseContaminationAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'buildingsHowMinimiseContamination',
    hint: 'For example, disinfection points and measures taken when milking dairy cattle',
    rows: 8,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter information about how you will reduce building contamination'
      }
    }
  }
}
