import { TextAnswer } from '../text/text.js'
import { CphNumberAnswer } from './cph-number.js'

const validPayload = {
  cphNumber: '12/456/7899'
}

describe('CphNumberAnswer', () => {
  it('should be a text input', () => {
    expect(new CphNumberAnswer(validPayload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(CphNumberAnswer.config.payloadKey).toBe('cphNumber')
  })

  it('should autocomplete', () => {
    expect(CphNumberAnswer.config.autocomplete).toBe('cph-number')
  })

  it('should strip whitespace', () => {
    expect(CphNumberAnswer.config.stripWhitespace).toBe(true)
  })

  it('should display with a char width of 10', () => {
    expect(CphNumberAnswer.config.characterWidth).toBe(10)
  })

  it('should have a hint', () => {
    expect(CphNumberAnswer.config.hint).toBe('For example, 12/345/6789')
  })

  describe('#CphNumberAnswer.validate', () => {
    it('should return true for valid cphNumber', () => {
      const cphNumber = new CphNumberAnswer(validPayload)
      const { isValid, errors } = cphNumber.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should return false for an empty input', () => {
      const cphNumber = new CphNumberAnswer()
      const { isValid, errors } = cphNumber.validate()

      expect(isValid).toBe(false)
      expect(errors.cphNumber.text).toBe(
        'Enter the farm or premises CPH number'
      )
    })

    it('should return false for malformed input', () => {
      const cphNumber = new CphNumberAnswer({
        cphNumber: '1/2/3'
      })

      const { isValid, errors } = cphNumber.validate()

      expect(isValid).toBe(false)
      expect(errors.cphNumber.text).toBe(
        'Enter the CPH number in the correct format, for example, 12/345/6789'
      )
    })
  })
})
