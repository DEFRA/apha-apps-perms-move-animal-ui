import { LicenceSection } from './licence.js'
import { FullNamePage } from '~/src/server/licence/fullName/index.js'

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
      expect(result.firstInvalidPage).toBeInstanceOf(FullNamePage)
    })
  })
})
