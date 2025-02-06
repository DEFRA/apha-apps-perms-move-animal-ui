import { BiosecuritySection } from './biosecurity.js'
import { KeptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'

/**
 * @import { YesNoRadioButtonData } from '../../answer/yes-no-radio-button/yes-no-radio-button.js'
 */
const testKeptSeparatelyAnswer = /** @type {YesNoRadioButtonData} */ ('yes')
const testGrazingAnswer = /** @type {YesNoRadioButtonData} */ ('yes')

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
        keptSeparately: undefined,
        grazing: testGrazingAnswer
      }

      const result = BiosecuritySection.fromState(biosecurityData).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(KeptSeparatelyPage)
    })
  })
})
