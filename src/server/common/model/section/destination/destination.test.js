import { DestinationTypePage } from '~/src/server/destination/destination-type/index.js'
import { DestinationSection } from './destination.js'
import { validOriginSectionState } from '../../../test-helpers/journey-state.js'

/**
 * @import { DestinationTypeData } from '../../answer/destination-type/destination-type.js'
 * @type {DestinationTypeData}
 */
const testDestinationType = 'slaughter'

const destinationData = {
  destinationType: testDestinationType
}

describe('Destination', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const result = DestinationSection.fromState({
        destination: destinationData
      }).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const destinationData = {
        destinationType: undefined
      }

      const result = DestinationSection.fromState({
        destination: destinationData
      }).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(DestinationTypePage)
    })
  })

  describe('isEnabled', () => {
    it('should return false if the origin section is not complete', () => {
      const applicationState = {
        origin: {}
      }

      expect(DestinationSection.config.isEnabled(applicationState)).toBe(false)
    })

    it('should return true if the origin section is complete', () => {
      const applicationState = {
        origin: validOriginSectionState
      }
      expect(DestinationSection.config.isEnabled(applicationState)).toBe(true)
    })
  })
})
