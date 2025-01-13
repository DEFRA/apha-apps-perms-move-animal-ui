import { ReceiveMethodPage } from '~/src/server/licence/receiveMethod/index.js'
import { LicenceSection } from './licence.js'

const testEmail = 'test@domain.com'

describe('Licence', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const originData = {
        emailAddress: testEmail,
        receiveMethod: 'email'
      }
      const result = LicenceSection.fromState(originData).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const originData = {
        emailAddress: undefined
      }

      const result = LicenceSection.fromState(originData).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(ReceiveMethodPage)
    })
  })
})
