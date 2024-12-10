import { Licence } from './licence.js'
import { EmailAddress } from '../answer/email-address.js'

const testEmail = 'test@domain.com'

describe('Licence', () => {
  let destination

  beforeEach(() => {
    destination = new Licence()
    destination._data = {}
  })

  describe('fromState', () => {
    it('should create an Origin instance with valid nested objects', () => {
      const licenceData = {
        emailAddress: testEmail
      }

      const licence = Licence.fromState(licenceData)

      expect(licence).toBeInstanceOf(Licence)
      expect(licence._data?.emailAddress).toBeInstanceOf(EmailAddress)
    })

    it('should handle undefined state gracefully', () => {
      const licence = Licence.fromState(undefined)

      expect(licence).toBeInstanceOf(Licence)
      expect(licence._data?.emailAddress.value).toBeUndefined()
    })
  })

  describe('emailAddress', () => {
    it('should return the licence email address answer model', () => {
      const licence = Licence.fromState(undefined)

      expect(licence.emailAddress).toBeInstanceOf(EmailAddress)
    })
  })
})
