import {
  FullNameFuturePage,
  fullNameFuturePage
} from '~/src/server/tb/licence/full-name-future/index.js'
import { LicenceSection } from './licence.js'
import { fullNamePage } from '~/src/server/tb/licence/full-name/index.js'

const testEmail = 'test@domain.com'
const testFullName = {
  firstName: 'Loxanna',
  lastName: 'Troi'
}

const licenceData = {
  emailAddress: testEmail,
  receiveMethod: 'email',
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
      expect(result.firstInvalidPage).toBeInstanceOf(FullNameFuturePage)
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

      it('should return FullNameFuturePage if origin.onOffFarm is "on"', () => {
        const applicationState = {
          origin: {
            onOffFarm: 'on'
          }
        }

        const result = LicenceSection.firstPageFactory(applicationState)
        expect(result).toBe(fullNameFuturePage)
      })
    })
  })
})
