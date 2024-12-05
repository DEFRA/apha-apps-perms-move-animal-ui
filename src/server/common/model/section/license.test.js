import { License } from './license.js'
import { EmailAddress } from '../answer/email-address.js'

const testEmail = 'test@domain.com'

describe('License', () => {
  let destination

  beforeEach(() => {
    destination = new License()
    destination._data = {}
  })

  describe('fromState', () => {
    it('should create an Origin instance with valid nested objects', () => {
      const licenseData = {
        emailAddress: testEmail
      }

      const license = License.fromState(licenseData)

      expect(license).toBeInstanceOf(License)
      expect(license._data?.emailAddress).toBeInstanceOf(EmailAddress)
    })

    it('should handle undefined state gracefully', () => {
      const license = License.fromState(undefined)

      expect(license).toBeInstanceOf(License)
      expect(license._data?.emailAddress.value).toBeUndefined()
    })
  })

  describe('emailAddress', () => {
    it('should return the licence email address answer model', () => {
      const license = License.fromState(undefined)

      expect(license.emailAddress).toBeInstanceOf(EmailAddress)
    })
  })
})
