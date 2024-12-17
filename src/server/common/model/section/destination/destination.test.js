import { DestinationSection } from './destination.js'
import { DestinationTypeAnswer } from '../../answer/destination-type/destination-type.js'

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
      expect(destination.destinationType).toBeInstanceOf(DestinationTypeAnswer)
    })

    it('should handle undefined state gracefully', () => {
      const destination = DestinationSection.fromState(undefined)

      expect(destination).toBeInstanceOf(DestinationSection)
      expect(destination.destinationType.value).toBeUndefined()
    })
  })

  describe('destinationType', () => {
    it('should return the destination type answer model', () => {
      const destination = DestinationSection.fromState(undefined)

      expect(destination.destinationType).toBeInstanceOf(DestinationTypeAnswer)
    })
  })
})
