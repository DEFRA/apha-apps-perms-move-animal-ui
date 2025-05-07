import { TextAreaAnswer } from '../text-area/text-area.js'
import { OtherWildlifeMeasuresAnswer } from './other-wildlife-measures.js'
/** @import {OtherWildlifeMeasuresPayload} from './other-wildlife-measures.js' */

const maxLength = 5000

/** @type {OtherWildlifeMeasuresPayload} */
const payload = {
  otherWildlifeMeasures: 'yesterday'
}

describe('OtherWildlifeMeasures', () => {
  it('should be a text area', () => {
    expect(new OtherWildlifeMeasuresAnswer(payload)).toBeInstanceOf(
      TextAreaAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(OtherWildlifeMeasuresAnswer.config.payloadKey).toBe(
      'otherWildlifeMeasures'
    )
  })

  it('should have the right number of rows', () => {
    expect(OtherWildlifeMeasuresAnswer.config.rows).toBe(10)
  })

  it('should define the right max length and corresponding error message', () => {
    expect(OtherWildlifeMeasuresAnswer.config.validation.maxLength.value).toBe(
      maxLength
    )
    expect(
      OtherWildlifeMeasuresAnswer.config.validation.maxLength.message
    ).toBe('Your answer must be no longer than 5000 characters')
  })

  it('should not specify an empty validation message', () => {
    expect(OtherWildlifeMeasuresAnswer.config.validation.empty).toBeDefined()
  })

  it('should return "None" when otherWildlifeMeasures is an empty string', () => {
    const answer = new OtherWildlifeMeasuresAnswer({
      otherWildlifeMeasures: ''
    })
    expect(answer.emailHtml).toBe('None')
  })

  it('should return the HTML when otherWildlifeMeasures is not empty', () => {
    const answer = new OtherWildlifeMeasuresAnswer({
      otherWildlifeMeasures: 'Some info'
    })
    expect(answer.emailHtml).toBe('Some info')
  })

  it('should return escaped HTML when otherWildlifeMeasures is not empty', () => {
    const answer = new OtherWildlifeMeasuresAnswer({
      otherWildlifeMeasures: '[evil-link](example.com)'
    })
    expect(answer.emailHtml).toBe('\\[evil-link\\]\\(example.com\\)')
  })
})
