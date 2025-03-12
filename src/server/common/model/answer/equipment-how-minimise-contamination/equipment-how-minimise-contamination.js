import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ equipmentHowMinimiseContamination: string }} EquipmentHowMinimiseContaminationPayload
 */

/**
 * @augments {TextAreaAnswer<EquipmentHowMinimiseContaminationPayload>}
 */
export class EquipmentHowMinimiseContaminationAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'equipmentHowMinimiseContamination',
    rows: 8,
    isPageHeading: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter how you will minimise the risk of spread of TB infection to the incoming cattle when using shared equipment'
      }
    }
  }
}
