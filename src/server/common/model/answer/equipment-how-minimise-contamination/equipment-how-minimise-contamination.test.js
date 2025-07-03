import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { EquipmentHowMinimiseContaminationAnswer } from './equipment-how-minimise-contamination.js'

/** @import {EquipmentHowMinimiseContaminationPayload} from './equipment-how-minimise-contamination.js' */

/** @type {EquipmentHowMinimiseContaminationPayload} */
const payload = {
  equipmentHowMinimiseContamination: ['designatedDisinfectionPoints']
}

describe('EquipmentHowMinimiseContamination', () => {
  it('should be a checkbox', () => {
    expect(new EquipmentHowMinimiseContaminationAnswer(payload)).toBeInstanceOf(
      CheckboxAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(EquipmentHowMinimiseContaminationAnswer.config.payloadKey).toBe(
      'equipmentHowMinimiseContamination'
    )
  })

  it('should be a page heading', () => {
    expect(EquipmentHowMinimiseContaminationAnswer.config.isPageHeading).toBe(
      true
    )
  })

  it('should define the right empty input message', () => {
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.validation.empty?.message
    ).toBe(
      'Select which measures are in place to clean and disinfect equipment to reduce the risk of spreading TB'
    )
  })

  it('should have the expected options to select from', () => {
    expect(
      Object.keys(EquipmentHowMinimiseContaminationAnswer.config.options)
    ).toHaveLength(5)
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.options
        .designatedDisinfectionPoints.label
    ).toBe('Designated disinfection points')
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.options
        .disinfectingMachinery.label
    ).toBe('Cleaning and disinfecting shared machinery')
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.options
        .disinfectingMilkingAndHandling.label
    ).toBe('Cleaning and disinfecting shared milking and handling facilities')
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.options.equipmentNotShared
        .label
    ).toBe(
      'Equipment is not shared between the incoming animals and the resident herd'
    )
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.options.other.label
    ).toBe('Other cleaning and disinfection measures')
  })
})
