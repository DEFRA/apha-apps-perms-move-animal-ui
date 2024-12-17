import { DestinationSection } from './destination.js'

describe('Destination', () => {
  let destination

  beforeEach(() => {
    destination = new DestinationSection()
    destination._data = {}
  })

  describe('validate', () => {
    it('should return invalid', () => {
      const result = DestinationSection.fromState().validate()
      expect(result.isValid).toBe(false)
    })
  })

  describe('fromState', () => {
    it('should return an instance of Destination', () => {
      const instance = DestinationSection.fromState()
      expect(instance).toBeInstanceOf(DestinationSection)
    })
  })
})
