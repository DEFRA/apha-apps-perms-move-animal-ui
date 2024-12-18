import { DestinationSection } from './destination.js'

/**
 * @import { DestinationTypeData } from '../../answer/destination-type/destination-type.js'
 * @type {DestinationTypeData}
 */
const testDestinationType = 'slaughter'

describe('Destination', () => {
  describe('fromState', () => {
    it('should create an Destination instance with valid nested objects', () => {
      const destinationData = {
        destinationType: testDestinationType
      }

      const destination = DestinationSection.fromState(destinationData)

      expect(destination).toBeInstanceOf(DestinationSection)
    })

    it('should handle undefined state gracefully', () => {
      const destination = DestinationSection.fromState(undefined)

      expect(destination).toBeInstanceOf(DestinationSection)
    })
  })
})
