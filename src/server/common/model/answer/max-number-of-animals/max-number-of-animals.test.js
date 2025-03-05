import { TextAnswer } from '../text/text.js'
import { MaxNumberOfAnimalsAnswer } from './max-number-of-animals.js'
/** @import {MaxNumberOfAnimalsPayload} from './max-number-of-animals.js' */

const maxLength = 5000

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
    expect(MaxNumberOfAnimalsAnswer.config.validation.empty.message).toBe(
      'Enter how many animals you are planning to move'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(MaxNumberOfAnimalsAnswer.config.validation.maxLength.value).toBe(
      maxLength
    )
    expect(MaxNumberOfAnimalsAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  describe('MaxNumberOfAnimalsAnswer.validate', () => {
    const validInputs = ['1', '12', '123']
    const invalidInputs = ['-5', '12.3', 'abc']

    validInputs.forEach((input) => {
      it(`should return true for valid input ${input}`, () => {
        const maxNumberOfAnimals = new MaxNumberOfAnimalsAnswer({
          maxNumberOfAnimals: input
        })
        const { isValid, errors } = maxNumberOfAnimals.validate()

        expect(isValid).toBe(true)
        expect(errors).toEqual({})
      })
    })

    invalidInputs.forEach((input) => {
      it(`should return false for invalid input: ${input}`, () => {
        const maxNumberOfAnimals = new MaxNumberOfAnimalsAnswer({
          maxNumberOfAnimals: input
        })

        const { isValid, errors } = maxNumberOfAnimals.validate()

        expect(isValid).toBe(false)
        expect(errors.maxNumberOfAnimals.text).toBe('Enter a number')
      })
    })
  })
})
