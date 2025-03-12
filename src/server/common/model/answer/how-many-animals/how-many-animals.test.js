import { TextAnswer } from '../text/text.js'
import { HowManyAnimalsAnswer } from './how-many-animals.js'
/** @import {HowManyAnimalsPayload} from './how-many-animals.js' */

/** @type {HowManyAnimalsPayload} */
const payload = {
  howManyAnimals: '123'
}

describe('HowManyAnimals', () => {
  it('should be a text input', () => {
    expect(new HowManyAnimalsAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(HowManyAnimalsAnswer.config.payloadKey).toBe('howManyAnimals')
  })

  it('should define the right empty input message', () => {
    expect(HowManyAnimalsAnswer.config.validation.empty?.message).toBe(
      'Enter how many animals you are planning to move'
    )
  })

  it('should define the right minimum value and its error message', () => {
    expect(HowManyAnimalsAnswer.config.validation.min?.value).toBe(1)
    expect(HowManyAnimalsAnswer.config.validation.min?.message).toBe(
      'Enter a number 1 or above'
    )
  })

  it('should define the right maximum value and its error message', () => {
    expect(HowManyAnimalsAnswer.config.validation.max?.value).toBe(5000)
    expect(HowManyAnimalsAnswer.config.validation.max?.message).toBe(
      'Enter a number 5000 or below'
    )
  })
})
