import { TextAnswer } from '../text/text.js'
import { DilutionRateAnswer } from './dilution-rate.js'
/** @import {DilutionRatePayload} from './dilution-rate.js' */

const maxLength = 5000

/** @type {DilutionRatePayload} */
const payload = {
  dilutionRate: 'some dilutionRate'
}

describe('DilutionRate', () => {
  it('should be a text input', () => {
    expect(new DilutionRateAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(DilutionRateAnswer.config.payloadKey).toBe('dilutionRate')
  })

  it('should have the right hint', () => {
    expect(DilutionRateAnswer.config.hint).toBe('For example, 15')
  })

  it('should define the right empty input message', () => {
    expect(DilutionRateAnswer.config.validation.empty?.message).toBe(
      'Enter the dilution rate'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(DilutionRateAnswer.config.validation.maxLength?.value).toBe(
      maxLength
    )
    expect(DilutionRateAnswer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  it('should have the right isPageHeading value', () => {
    expect(DilutionRateAnswer.config.isPageHeading).toBe(false)
  })

  describe('DilutionRateAnswer.validate', () => {
    const validInputs = ['1', '12', '123']
    const invalidInputs = ['-5', '12.3', 'abc']

    validInputs.forEach((input) => {
      it(`should return true for valid input ${input}`, () => {
        const dilutionRate = new DilutionRateAnswer({ dilutionRate: input })
        const { isValid, errors } = dilutionRate.validate()

        expect(isValid).toBe(true)
        expect(errors).toEqual({})
      })
    })

    invalidInputs.forEach((input) => {
      it(`should return false for invalid input: ${input}`, () => {
        const dilutionRate = new DilutionRateAnswer({ dilutionRate: input })

        const { isValid, errors } = dilutionRate.validate()

        expect(isValid).toBe(false)
        expect(errors.dilutionRate.text).toBe('Enter a number')
      })
    })
  })
})
