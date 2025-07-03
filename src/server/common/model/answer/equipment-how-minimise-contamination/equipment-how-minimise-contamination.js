import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/**
 * @typedef {{ equipmentHowMinimiseContamination: CheckboxData }} EquipmentHowMinimiseContaminationPayload
 */

/**
 * @augments {CheckboxAnswer<EquipmentHowMinimiseContaminationPayload>}
 */
export class EquipmentHowMinimiseContaminationAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'equipmentHowMinimiseContamination',
    isPageHeading: true,
    hint: 'Only select the measures you are taking. You do not need to select them all to receive your licence.',
    options: {
      designatedDisinfectionPoints: {
        label: 'Designated disinfection points'
      },
      disinfectingMachinery: {
        label: 'Cleaning and disinfecting shared machinery'
      },
      disinfectingMilkingAndHandling: {
        label:
          'Cleaning and disinfecting shared milking and handling facilities'
      },
      equipmentNotShared: {
        label:
          'Equipment is not shared between the incoming animals and the resident herd'
      },
      other: {
        label: 'Other cleaning and disinfection measures'
      }
    },
    errors: {
      emptyOptionText: {
        message:
          'Select which measures are in place to clean and disinfect equipment to reduce the risk of spreading TB'
      }
    }
  }
}
