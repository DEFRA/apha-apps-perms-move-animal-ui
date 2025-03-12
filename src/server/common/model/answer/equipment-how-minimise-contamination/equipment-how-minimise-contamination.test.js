import { TextAreaAnswer } from '../text-area/text-area.js'
import { EquipmentHowMinimiseContaminationAnswer } from './equipment-how-minimise-contamination.js'
/** @import {EquipmentHowMinimiseContaminationPayload} from './equipment-how-minimise-contamination.js' */

const maxLength = 5000

/** @type {EquipmentHowMinimiseContaminationPayload} */
const payload = {
  equipmentHowMinimiseContamination: 'somehow'
}

describe('EquipmentHowMinimiseContamination', () => {
  it('should be a text area', () => {
    expect(new EquipmentHowMinimiseContaminationAnswer(payload)).toBeInstanceOf(
      TextAreaAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(EquipmentHowMinimiseContaminationAnswer.config.payloadKey).toBe(
      'equipmentHowMinimiseContamination'
    )
  })

  it('should have the right number of rows', () => {
    expect(EquipmentHowMinimiseContaminationAnswer.config.rows).toBe(8)
  })

  it('should not be a page heading', () => {
    expect(EquipmentHowMinimiseContaminationAnswer.config.isPageHeading).toBe(
      false
    )
  })

  it('should define the right empty input message', () => {
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.validation.empty?.message
    ).toBe(
      'Enter how you will minimise the risk of spread of TB infection to the incoming cattle when using shared equipment'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.validation.maxLength.value
    ).toBe(maxLength)
    expect(
      EquipmentHowMinimiseContaminationAnswer.config.validation.maxLength
        .message
    ).toBe('Your answer must be no longer than 5000 characters')
  })
})
