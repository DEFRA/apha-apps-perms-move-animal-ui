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
    hintI18nKey: 'tb.biosecurity.equipmentHowMinimiseContamination.hint',
    options: {
      designatedDisinfectionPoints: {
        label: 'Designated disinfection points',
        labelI18nKey:
          'tb.biosecurity.equipmentHowMinimiseContamination.options.designatedDisinfectionPoints.label'
      },
      disinfectingMachinery: {
        label: 'Cleaning and disinfecting shared machinery',
        labelI18nKey:
          'tb.biosecurity.equipmentHowMinimiseContamination.options.disinfectingMachinery.label'
      },
      disinfectingMilkingAndHandling: {
        label:
          'Cleaning and disinfecting shared milking and handling facilities',
        labelI18nKey:
          'tb.biosecurity.equipmentHowMinimiseContamination.options.disinfectingMilkingAndHandling.label'
      },
      equipmentNotShared: {
        label:
          'Equipment is not shared between the incoming animals and the resident herd',
        labelI18nKey:
          'tb.biosecurity.equipmentHowMinimiseContamination.options.equipmentNotShared.label'
      },
      other: {
        label: 'Other cleaning and disinfection measures',
        labelI18nKey:
          'tb.biosecurity.equipmentHowMinimiseContamination.options.other.label'
      }
    },
    validation: {
      empty: {
        message:
          'Select which measures are in place to clean and disinfect equipment to reduce the risk of spreading TB'
      }
    }
  }
}
