import { License } from './license.js'
import { EmailAddress } from '../answer/email-address.js'

const testEmail = 'test@domain.com'

describe('License', () => {
  let destination

  beforeEach(() => {
    destination = new License()
    destination._data = {}
  })

  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const licenseData = {
        emailAddress: testEmail
      }
      const result = License.fromState(licenseData).validate()

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should return invalid if any nested object is invalid', () => {
      const licenseData = {
        emailAddress: ''
      }

      const result = License.fromState(licenseData).validate()

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('license')
    })
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
})
