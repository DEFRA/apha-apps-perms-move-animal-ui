import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'} EquipmentAnySharedData
 * @typedef {{ equipmentShared: EquipmentAnySharedData }} EquipmentAnySharedPayload
 */

/**
 * @augments {RadioButtonAnswer<EquipmentAnySharedPayload>}
 */
export class EquipmentAnySharedAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'equipmentShared',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    errors: {
      emptyOptionText:
        'Select if the incoming cattle will share any equipment and machinery with the resident herd'
    },
    layout: 'inline'
  }
}
