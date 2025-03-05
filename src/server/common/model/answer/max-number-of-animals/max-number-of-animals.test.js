import { TextAnswer } from '../text/text.js'
import { MaxNumberOfAnimalsAnswer } from './max-number-of-animals.js'
/** @import {MaxNumberOfAnimalsPayload} from './max-number-of-animals.js' */

/** @type {MaxNumberOfAnimalsPayload} */
const payload = {
  maxNumberOfAnimals: '123'
}

describe('MaxNumberOfAnimals', () => {
  it('should be a text input', () => {
    expect(new MaxNumberOfAnimalsAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(MaxNumberOfAnimalsAnswer.config.payloadKey).toBe(
      'maxNumberOfAnimals'
    )
  })

  it('should define the right empty input message', () => {
    expect(MaxNumberOfAnimalsAnswer.config.validation.empty?.message).toBe(
      'Enter how many animals you are planning to move'
    )
  })

  it('should define the right minimum value and its error message', () => {
    expect(MaxNumberOfAnimalsAnswer.config.validation.min?.value).toBe(1)
    expect(MaxNumberOfAnimalsAnswer.config.validation.min?.message).toBe(
      'Enter a number 1 or above'
    )
  })

  it('should define the right maximum value and its error message', () => {
    expect(MaxNumberOfAnimalsAnswer.config.validation.max?.value).toBe(5000)
    expect(MaxNumberOfAnimalsAnswer.config.validation.max?.message).toBe(
      'Enter a number 5000 or below'
    )
  })
})
