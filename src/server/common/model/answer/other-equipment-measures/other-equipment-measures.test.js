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
      'Enter what other measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'
    )
  })

  it('should return "None" when otherEquipmentMeasures is an empty string', () => {
    const answer = new OtherEquipmentMeasuresAnswer({
      otherEquipmentMeasures: ''
    })
    expect(answer.emailHtml).toBe('None')
  })

  it('should return the HTML when otherEquipmentMeasures is not empty', () => {
    const answer = new OtherEquipmentMeasuresAnswer({
      otherEquipmentMeasures: 'Some info'
    })
    expect(answer.emailHtml).toBe('Some info')
  })

  it('should return escaped HTML when otherEquipmentMeasures is not empty', () => {
    const answer = new OtherEquipmentMeasuresAnswer({
      otherEquipmentMeasures: '[evil-link](example.com)'
    })
    expect(answer.emailHtml).toBe('\\[evil-link\\]\\(example.com\\)')
  })
})
