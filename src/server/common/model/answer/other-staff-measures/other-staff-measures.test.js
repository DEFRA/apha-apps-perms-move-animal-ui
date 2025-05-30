import { TextAreaAnswer } from '../text-area/text-area.js'
import { OtherStaffMeasuresAnswer } from './other-staff-measures.js'

/** @import {OtherStaffMeasuresPayload} from './other-staff-measures.js' */

const maxLength = 5000

/** @type {OtherStaffMeasuresPayload} */
const payload = {
  otherStaffMeasures: 'some measures'
}

describe('OtherStaffMeasures', () => {
  it('should be a text area', () => {
    expect(new OtherStaffMeasuresAnswer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(OtherStaffMeasuresAnswer.config.payloadKey).toBe(
      'otherStaffMeasures'
    )
  })

  it('should have the right number of rows', () => {
    expect(OtherStaffMeasuresAnswer.config.rows).toBe(6)
  })

  it('should define the right max length and corresponding error message', () => {
    expect(OtherStaffMeasuresAnswer.config.validation.maxLength.value).toBe(
      maxLength
    )
    expect(OtherStaffMeasuresAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  it('should specify an empty validation message', () => {
    expect(OtherStaffMeasuresAnswer.config.validation.empty).toBeDefined()
    expect(OtherStaffMeasuresAnswer.config.validation.empty?.message).toBe(
      'Enter what other measures staff are taking to reduce the risk of spreading TB'
    )
  })

  it('should return "None" when otherStaffMeasures is an empty string', () => {
    const answer = new OtherStaffMeasuresAnswer({
      otherStaffMeasures: ''
    })
    expect(answer.emailHtml).toBe('None')
  })

  it('should return the HTML when otherStaffMeasures is not empty', () => {
    const answer = new OtherStaffMeasuresAnswer({
      otherStaffMeasures: 'Some info'
    })
    expect(answer.emailHtml).toBe('Some info')
  })

  it('should return escaped HTML when otherStaffMeasures is not empty', () => {
    const answer = new OtherStaffMeasuresAnswer({
      otherStaffMeasures: '[evil-link](example.com)'
    })
    expect(answer.emailHtml).toBe('\\[evil-link\\]\\(example.com\\)')
  })
})
