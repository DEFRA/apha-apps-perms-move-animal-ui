import { BiosecuritySection } from './biosecurity.js'
import { KeptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'

const validBiosecurityData = {
  keptSeparately: 'yes',
  grazing: 'yes',
  lastGrazed: 'yesterday',
  manureAndSlurry: 'yes',
  grazingFieldHowSeparated: 'some details',
  roadsAndTracks: 'yes',
  buildingsAnyShared: 'yes',
  buildingsHowMinimiseContamination: 'somehow',
  peopleDisinfection: 'ppe',
  disinfectant: 'some disinfectant'
}

const invalidBiosecurityData = {
  keptSeparately: undefined,
  grazing: undefined,
  lastGrazed: undefined,
  manureAndSlurry: undefined,
  grazingFieldHowSeparated: undefined,
  roadsAndTracks: undefined,
  buildingsAnyShared: undefined,
  buildingsHowMinimiseContamination: undefined,
  peopleDisinfection: undefined,
  disinfectant: undefined
}

describe('Biosecurity', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const biosecurityData = validBiosecurityData
      const result = BiosecuritySection.fromState({
        biosecurity: biosecurityData
      }).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const result = BiosecuritySection.fromState({
        biosecurity: invalidBiosecurityData
      }).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(KeptSeparatelyPage)
    })
  })
})
