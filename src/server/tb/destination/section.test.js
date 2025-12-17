import { DestinationTypePage } from '~/src/server/tb/destination/destination-type/index.js'
import { DestinationSection } from './section.js'
import {
  validDestinationSectionState,
  validOriginSectionState
} from '../../common/test-helpers/journey-state.js'

const destinationData = validDestinationSectionState

const mockRequest = /** @type {any} */ ({ server: {}, yar: {} })

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
      expect(result.firstInvalidPageUrl).toBe(new DestinationTypePage().urlPath)
    })
  })

  describe('isEnabled', () => {
    it('should return false if the origin section is not complete', async () => {
      const applicationState = {
        origin: {}
      }

      expect(
        await DestinationSection.config.isEnabled(applicationState, mockRequest)
      ).toBe(false)
    })

    it('should return true if the origin section is complete', async () => {
      const applicationState = {
        origin: validOriginSectionState
      }
      expect(
        await DestinationSection.config.isEnabled(applicationState, mockRequest)
      ).toBe(true)
    })
  })
})
