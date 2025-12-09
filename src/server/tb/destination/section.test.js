import { DestinationTypePage } from '~/src/server/tb/destination/destination-type/index.js'
import { DestinationSection } from './section.js'
import {
  validDestinationSectionState,
  validOriginSectionState
} from '../../common/test-helpers/journey-state.js'
import {
  getFormContext,
  getFirstJourneyPage
} from '~/src/server/common/plugins/defra-forms/form-context.js'

jest.mock('~/src/server/common/plugins/defra-forms/form-context.js')

const destinationData = validDestinationSectionState

const mockRequest = /** @type {any} */ ({ server: {}, yar: {} })

describe('Destination', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

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
      const invalidPage = {
        getHref: jest.fn(() => '/origin/summary'),
        path: ''
      }
      jest.mocked(getFormContext).mockResolvedValue({
        errors: ['missing answers'],
        relevantPages: [invalidPage]
      })
      jest.mocked(getFirstJourneyPage).mockReturnValue(invalidPage)

      const applicationState = {
        origin: {}
      }

      expect(
        await DestinationSection.config.isEnabled(applicationState, mockRequest)
      ).toBe(false)
    })

    it('should return true if the origin section is complete', async () => {
      const validPage = { getHref: jest.fn(() => '/origin/summary'), path: '' }
      jest.mocked(getFormContext).mockResolvedValue({
        errors: [],
        relevantPages: [validPage]
      })
      jest.mocked(getFirstJourneyPage).mockReturnValue(validPage)

      const applicationState = {
        origin: validOriginSectionState
      }
      expect(
        await DestinationSection.config.isEnabled(applicationState, mockRequest)
      ).toBe(true)
    })
  })
})
