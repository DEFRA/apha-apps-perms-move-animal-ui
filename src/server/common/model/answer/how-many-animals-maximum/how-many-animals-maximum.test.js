import { TextAnswer } from '../text/text.js'
import { HowManyAnimalsMaximumAnswer } from './how-many-animals-maximum.js'
/** @import {HowManyAnimalsMaximumPayload} from './how-many-animals-maximum.js' */

/** @type {HowManyAnimalsMaximumPayload} */
const payload = {
  howManyAnimalsMaximum: '123'
}

describe('HowManyAnimalsMaximum', () => {
  it('should be a text input', () => {
    expect(new HowManyAnimalsMaximumAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(HowManyAnimalsMaximumAnswer.config.payloadKey).toBe(
      'howManyAnimalsMaximum'
    )
  })

  it('should define the right empty input message', () => {
    expect(HowManyAnimalsMaximumAnswer.config.validation.empty?.message).toBe(
      'Enter the maximum number of animals you are planning to move'
    )
  })

  it('should define the right minimum value and its error message', () => {
    expect(HowManyAnimalsMaximumAnswer.config.validation.min?.value).toBe(1)
    expect(HowManyAnimalsMaximumAnswer.config.validation.min?.message).toBe(
      'Enter a number 1 or above'
    )
  })

  it('should define the right maximum value and its error message', () => {
    expect(HowManyAnimalsMaximumAnswer.config.validation.max?.value).toBe(5000)
    expect(HowManyAnimalsMaximumAnswer.config.validation.max?.message).toBe(
      'Enter a number 5000 or below'
    )
  })
})
