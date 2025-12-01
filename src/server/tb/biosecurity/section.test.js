import { BiosecuritySection } from './section.js'
import {
  validApplicationState,
  validBiosecuritySectionState,
  validOriginSectionState,
  validDestinationSectionState
} from '../../common/test-helpers/journey-state.js'
import { ObligationsPage } from '~/src/server/tb/biosecurity/obligations/index.js'
/** @import {DestinationTypeData} from '../../common/model/answer/destination-type/destination-type.js' */

const validBiosecurityData = validBiosecuritySectionState

const invalidBiosecurityData = {}

describe('Biosecurity.validate', () => {
  it('should return valid if all nested objects are valid', () => {
    const biosecurityData = validBiosecurityData
    const result = BiosecuritySection.fromState({
      biosecurity: biosecurityData
    }).validate()

    expect(result.isValid).toBe(true)
  })

  it('should return invalid if any nested object is invalid', () => {
    const result = BiosecuritySection.fromState({
      biosecurity: invalidBiosecurityData
    }).validate()

    expect(result.isValid).toBe(false)
    expect(result.firstInvalidPageUrl).toBe(new ObligationsPage().urlPath)
  })
})

describe('Biosecurity.config.isVisible', () => {
  afterEach(jest.restoreAllMocks)

  const { origin, destination } = validApplicationState
  const appState = { origin, destination }

  it('should be visible if movement is on farm & destination premises is not AFU', () => {
    const isVisible = BiosecuritySection.config.isVisible(appState)
    expect(isVisible).toBe(true)
  })

  it('should not be visible if origin is incomplete', () => {
    const isVisible = BiosecuritySection.config.isVisible({
      origin: { onOffFarm: origin.onOffFarm },
      destination
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible if destination is incomplete', () => {
    const isVisible = BiosecuritySection.config.isVisible({
      origin,
      destination: { destinationType: destination.destinationType }
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible if movement is off the farm', () => {
    const isVisible = BiosecuritySection.config.isVisible({
      origin: validOriginSectionState,
      destination: validDestinationSectionState
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible if destination is AFU', () => {
    const isVisible = BiosecuritySection.config.isVisible({
      origin,
      destination: {
        /** @type {DestinationTypeData} */
        destinationType: 'afu'
      }
    })

    expect(isVisible).toBe(false)
  })
})
