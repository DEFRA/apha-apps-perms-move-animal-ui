import { LicenceSection } from './licence.js'
import { EmailAddressAnswer } from '../../answer/email/email-address.js'

const testEmail = 'test@domain.com'

describe('Licence', () => {
  let destination

  beforeEach(() => {
    destination = new LicenceSection()
    destination._data = {}
  })

  describe('fromState', () => {
    it('should create an Licence instance with valid nested objects', () => {
      const licenceData = {
        emailAddress: testEmail
      }

      const licence = LicenceSection.fromState(licenceData)

      expect(licence).toBeInstanceOf(LicenceSection)
      expect(licence.emailAddress).toBeInstanceOf(EmailAddressAnswer)
    })

    it('should handle undefined state gracefully', () => {
      const licence = LicenceSection.fromState(undefined)

      expect(licence).toBeInstanceOf(LicenceSection)
      expect(licence.emailAddress.value).toBeUndefined()
    })
  })

  describe('emailAddress', () => {
    it('should return the licence email address answer model', () => {
      const licence = LicenceSection.fromState(undefined)

      expect(licence.emailAddress).toBeInstanceOf(EmailAddressAnswer)
    })
  })
})
