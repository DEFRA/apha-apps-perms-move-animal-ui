import { Tests } from './tests.js'

describe('Tests', () => {
  let destination

  beforeEach(() => {
    destination = new Tests()
    destination._data = {}
  })

  describe('validate', () => {
    it('should return invalid', () => {
      const result = Tests.fromState().validate()
      expect(result.isValid).toBe(false)
    })
  })

  describe('fromState', () => {
    it('should return an instance of Tests', () => {
      const instance = Tests.fromState()
      expect(instance).toBeInstanceOf(Tests)
    })
  })
})
