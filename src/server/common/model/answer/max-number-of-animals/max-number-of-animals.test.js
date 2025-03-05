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

  describe('MaxNumberOfAnimalsAnswer.validate', () => {
    const validInputs = ['1', '12', '123', '5000']
    const nonNumericInputs = ['abc', '=123']
    const negativeInputs = ['-1', '-99999']
    const aboveMaxInputs = ['99999']
    const nonIntegerInputs = ['0.5', '-0.123', '9999.999']

    it.each(validInputs)('should return true for valid input %s', (input) => {
      const maxNumberOfAnimals = new MaxNumberOfAnimalsAnswer({
        maxNumberOfAnimals: input
      })
      const { isValid, errors } = maxNumberOfAnimals.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it.each(nonNumericInputs)(
      'should return false for non numeric input %s',
      (input) => {
        const maxNumberOfAnimals = new MaxNumberOfAnimalsAnswer({
          maxNumberOfAnimals: input
        })
        const { isValid, errors } = maxNumberOfAnimals.validate()

        expect(isValid).toBe(false)
        expect(errors.maxNumberOfAnimals.text).toBe('Enter a number')
      }
    )

    it.each(negativeInputs)(
      'should return false for negative input %s',
      (input) => {
        const maxNumberOfAnimals = new MaxNumberOfAnimalsAnswer({
          maxNumberOfAnimals: input
        })
        const { isValid, errors } = maxNumberOfAnimals.validate()

        expect(isValid).toBe(false)
        expect(errors.maxNumberOfAnimals.text).toBe('Enter a number 1 or above')
      }
    )

    it.each(aboveMaxInputs)(
      'should return false for input above the max %s',
      (input) => {
        const maxNumberOfAnimals = new MaxNumberOfAnimalsAnswer({
          maxNumberOfAnimals: input
        })
        const { isValid, errors } = maxNumberOfAnimals.validate()

        expect(isValid).toBe(false)
        expect(errors.maxNumberOfAnimals.text).toBe(
          'Enter a number 5000 or below'
        )
      }
    )

    it.each(nonIntegerInputs)(
      'should return false for non integer input %s',
      (input) => {
        const maxNumberOfAnimals = new MaxNumberOfAnimalsAnswer({
          maxNumberOfAnimals: input
        })
        const { isValid, errors } = maxNumberOfAnimals.validate()

        expect(isValid).toBe(false)
        expect(errors.maxNumberOfAnimals.text).toBe('Enter a whole number')
      }
    )

    it('should return false for empty input', () => {
      const maxNumberOfAnimals = new MaxNumberOfAnimalsAnswer({
        maxNumberOfAnimals: ''
      })
      const { isValid, errors } = maxNumberOfAnimals.validate()

      expect(isValid).toBe(false)
      expect(errors.maxNumberOfAnimals.text).toBe(
        'Enter how many animals you are planning to move'
      )
    })
  })
})
