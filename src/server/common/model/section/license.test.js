import { License } from './license.js'

describe('License', () => {
  let destination

  beforeEach(() => {
    destination = new License()
    destination._data = {}
  })

  describe('validate', () => {
    it('should return invalid', () => {
      const result = License.fromState().validate()
      expect(result.isValid).toBe(false)
    })
  })

  describe('fromState', () => {
    it('should return an instance of Destination', () => {
      const instance = License.fromState()
      expect(instance).toBeInstanceOf(License)
    })
  })
})
