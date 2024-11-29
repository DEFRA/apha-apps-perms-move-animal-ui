import { Destination } from './destination.js'

describe('Destination', () => {
  let destination

  beforeEach(() => {
    destination = new Destination()
    destination._data = {}
  })

  describe('validate', () => {
    it('should return invalid', () => {
      const result = Destination.fromState().validate()
      expect(result.isValid).toBe(false)
    })
  })

  describe('fromState', () => {
    it('should return an instance of Destination', () => {
      const instance = Destination.fromState()
      expect(instance).toBeInstanceOf(Destination)
    })
  })
})
