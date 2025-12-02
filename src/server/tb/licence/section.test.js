import {
  FullNameFuturePage,
  fullNameFuturePage
} from '~/src/server/tb/licence/full-name-future/index.js'
import { LicenceSection } from './section.js'
import { fullNamePage } from '~/src/server/tb/licence/full-name/index.js'
import {
  validDestinationSectionState,
  validOriginSectionState
} from '../../common/test-helpers/journey-state.js'

const testEmail = 'test@domain.com'
const testFullName = {
  firstName: 'Loxanna',
  lastName: 'Troi'
}

const licenceData = {
  emailAddress: testEmail,
  fullName: testFullName
}

describe('Licence', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const result = LicenceSection.fromState({
        licence: licenceData
      }).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const licenceData = {
        emailAddress: undefined
      }

      const result = LicenceSection.fromState({
        licence: licenceData
      }).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPageUrl).toBe(new FullNameFuturePage().urlPath)
    })

    describe('firstPageFactory', () => {
      it('should return FullNamePage if origin.onOffFarm is "off"', () => {
        const applicationState = {
          origin: {
            onOffFarm: 'off'
          }
        }

        const result = LicenceSection.firstPageFactory(applicationState)
        expect(result).toBe(fullNamePage)
      })

      it.each([['afu'], ['tb-restricted-farm'], ['other'], ['iso-unit']])(
        'should return FullNamePage for %s, if the movement is on',
        (originType) => {
          const applicationState = {
            origin: {
              onOffFarm: 'on',
              originType
            }
          }
          const result = LicenceSection.firstPageFactory(applicationState)
          expect(result).toBe(fullNamePage)
        }
      )

      it('should return FullNameFuturePage if origin.onOffFarm is "on" and origin.originType is not "afu", "tb-restricted", "other" or "iso-unit"', () => {
        const applicationState = {
          origin: {
            onOffFarm: 'on',
            originType: 'something-else'
          }
        }

        const result = LicenceSection.firstPageFactory(applicationState)
        expect(result).toBe(fullNameFuturePage)
      })
    })
  })

  describe('isEnabled', () => {
    it('should return true if OriginSection and DestinationSection are valid', () => {
      const app = {
        origin: validOriginSectionState,
        destination: validDestinationSectionState
      }

      const result = LicenceSection.config.isEnabled(app)
      expect(result).toBe(true)
    })

    it('should return false if OriginSection is invalid even if DestinationSection is valid', () => {
      const app = {
        origin: {},
        destination: validDestinationSectionState
      }

      const result = LicenceSection.config.isEnabled(app)
      expect(result).toBe(false)
    })

    it('should return false if DestinationSection is invalid even if OriginSection is valid', () => {
      const app = {
        origin: validOriginSectionState,
        destination: {}
      }

      const result = LicenceSection.config.isEnabled(app)
      expect(result).toBe(false)
    })

    it('should return false if both OriginSection and DestinationSection are invalid', () => {
      const app = {
        origin: {},
        destination: {}
      }

      const result = LicenceSection.config.isEnabled(app)
      expect(result).toBe(false)
    })
  })
})
