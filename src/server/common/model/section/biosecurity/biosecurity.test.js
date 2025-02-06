import { BiosecuritySection } from './biosecurity.js'
import { KeptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'

/**
 * @import { KeptSeparatelyData } from '../../answer/kept-separately/kept-separately.js'
 * @type {KeptSeparatelyData}
 */
const testKeptSeparatelyAnswer = 'yes'
const testGrazingAnswer = 'yes'

describe('Biosecurity', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const biosecurityData = {
        keptSeparately: testKeptSeparatelyAnswer,
        grazing: testGrazingAnswer
      }
      const result = BiosecuritySection.fromState(biosecurityData).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const biosecurityData = {
        keptSeparately: undefined
      }

      const result = BiosecuritySection.fromState(biosecurityData).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(KeptSeparatelyPage)
    })
  })
})
