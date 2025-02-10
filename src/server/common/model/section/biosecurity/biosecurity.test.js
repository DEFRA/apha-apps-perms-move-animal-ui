import { BiosecuritySection } from './biosecurity.js'
import { KeptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'

/**
 * @import { KeptSeparatelyData } from '../../answer/kept-separately/kept-separately.js'
 * @type {import('./biosecurity.js').BiosecurityData}
 */
const validBiosecurityData = {
  keptSeparately: 'yes',
  grazing: 'yes',
  lastGrazed: 'yesterday',
  manureAndSlurry: 'yes',
  grazingFieldHowSeparated: 'some details'
}

const invalidBiosecurityData = {
  keptSeparately: undefined,
  grazing: undefined,
  lastGrazed: undefined,
  manureAndSlurry: undefined,
  grazingFieldHowSeparated: undefined
}

describe('Biosecurity', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const biosecurityData = validBiosecurityData
      const result = BiosecuritySection.fromState(biosecurityData).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const result = BiosecuritySection.fromState(
        invalidBiosecurityData
      ).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(KeptSeparatelyPage)
    })
  })
})
