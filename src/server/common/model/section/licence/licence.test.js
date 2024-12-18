import { LicenceSection } from './licence.js'

const testEmail = 'test@domain.com'

describe('Licence', () => {
  describe('fromState', () => {
    it('should create an Licence instance with valid nested objects', () => {
      const licenceData = {
        emailAddress: testEmail
      }

      const licence = LicenceSection.fromState(licenceData)

      expect(licence).toBeInstanceOf(LicenceSection)
    })

    it('should handle undefined state gracefully', () => {
      const licence = LicenceSection.fromState(undefined)

      expect(licence).toBeInstanceOf(LicenceSection)
    })
  })
})
