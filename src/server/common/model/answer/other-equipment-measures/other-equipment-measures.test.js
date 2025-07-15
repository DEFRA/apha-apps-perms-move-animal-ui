import { TextAreaAnswer } from '../text-area/text-area.js'
import { OtherEquipmentMeasuresAnswer } from './other-equipment-measures.js'

/** @import {OtherEquipmentMeasuresPayload} from './other-equipment-measures.js' */

const maxLength = 5000

/** @type {OtherEquipmentMeasuresPayload} */
const payload = {
  otherEquipmentMeasures: 'some measures'
}

describe('OtherEquipmentMeasures', () => {
  it('should be a text area', () => {
    expect(new OtherEquipmentMeasuresAnswer(payload)).toBeInstanceOf(
      TextAreaAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(OtherEquipmentMeasuresAnswer.config.payloadKey).toBe(
      'otherEquipmentMeasures'
    )
  })

  it('should have the right number of rows', () => {
    expect(OtherEquipmentMeasuresAnswer.config.rows).toBe(6)
  })

  it('should define the right max length and corresponding error message', () => {
    expect(OtherEquipmentMeasuresAnswer.config.validation.maxLength.value).toBe(
      maxLength
    )
    expect(
      OtherEquipmentMeasuresAnswer.config.validation.maxLength.message
    ).toBe('Your answer must be no longer than 5000 characters')
  })

  it('should specify an empty validation message', () => {
    expect(OtherEquipmentMeasuresAnswer.config.validation.empty).toBeDefined()
    expect(OtherEquipmentMeasuresAnswer.config.validation.empty?.message).toBe(
      'Enter what other measures are in place to clean and disinfect equipment to reduce the risk of spreading TB'
    )
  })
})
