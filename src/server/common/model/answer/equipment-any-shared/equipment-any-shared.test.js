import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { EquipmentAnySharedAnswer } from './equipment-any-shared.js'
/** @import {EquipmentAnySharedPayload} from './equipment-any-shared.js' */

/** @type {EquipmentAnySharedPayload} */
const payload = {
  equipmentShared: 'yes'
}

describe('BuildingsAnyShared', () => {
  it('should be a radio button', () => {
    expect(new EquipmentAnySharedAnswer(payload)).toBeInstanceOf(
      RadioButtonAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(EquipmentAnySharedAnswer.config.payloadKey).toBe('equipmentShared')
  })

  it('should define the right empty input message', () => {
    expect(EquipmentAnySharedAnswer.config.errors.emptyOptionText).toBe(
      'Select if the incoming cattle will share any equipment and machinery with the resident herd'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(EquipmentAnySharedAnswer.config.options)).toHaveLength(2)
    expect(EquipmentAnySharedAnswer.config.options.yes.label).toBe('Yes')
    expect(EquipmentAnySharedAnswer.config.options.no.label).toBe('No')
  })
})
