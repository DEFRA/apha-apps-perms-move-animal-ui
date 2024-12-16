import { Destination } from './destination.js'
import { DestinationType } from '../answer/destination-type.js'

/**
 * @import { DestinationTypeData } from '../answer/destination-type.js'
 * @type {DestinationTypeData}
 */
const testDestinationType = 'slaughter'

describe('Destination', () => {
  describe('fromState', () => {
    it('should create an Destination instance with valid nested objects', () => {
      const destinationData = {
        destinationType: testDestinationType
      }

      const destination = Destination.fromState(destinationData)

      expect(destination).toBeInstanceOf(Destination)
      expect(destination.destinationType).toBeInstanceOf(DestinationType)
    })

    it('should handle undefined state gracefully', () => {
      const destination = Destination.fromState(undefined)

      expect(destination).toBeInstanceOf(Destination)
      expect(destination.destinationType.value).toBeUndefined()
    })
  })

  describe('destinationType', () => {
    it('should return the destination type answer model', () => {
      const destination = Destination.fromState(undefined)

      expect(destination.destinationType).toBeInstanceOf(DestinationType)
    })
  })
})
