import { TestsSection } from './tests.js'

describe('Tests', () => {
  let destination

  beforeEach(() => {
    destination = new TestsSection()
    destination._data = {}
  })

  describe('validate', () => {
    it('should return invalid', () => {
      const result = TestsSection.fromState().validate()
      expect(result.isValid).toBe(false)
    })
  })

  describe('fromState', () => {
    it('should return an instance of Tests', () => {
      const instance = TestsSection.fromState()
      expect(instance).toBeInstanceOf(TestsSection)
    })
  })
})
