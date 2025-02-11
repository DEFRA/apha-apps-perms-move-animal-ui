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
  grazingFieldHowSeparated: 'some details',
  roadsAndTracks: 'yes',
  buildingsAnyShared: 'yes'
}

const invalidBiosecurityData = {
  keptSeparately: undefined,
  grazing: undefined,
  lastGrazed: undefined,
  manureAndSlurry: undefined,
  grazingFieldHowSeparated: undefined,
  roadsAndTracks: undefined,
  buildingsAnyShared: undefined
}

/** @type {import('../../state/state-manager.js').RawApplicationState} */
const applicationState = {}

describe('Biosecurity', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const biosecurityData = validBiosecurityData
      const result = BiosecuritySection.fromState(
        biosecurityData,
        applicationState
      ).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const result = BiosecuritySection.fromState(
        invalidBiosecurityData,
        applicationState
      ).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(KeptSeparatelyPage)
    })
  })
})
