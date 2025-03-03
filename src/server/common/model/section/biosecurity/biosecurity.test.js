import { BiosecuritySection } from './biosecurity.js'
import { KeptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'
import {
  validApplicationStateWithBioSecurity,
  validBiosecuritySectionState,
  validOriginSectionState,
  validDestinationSectionState
} from '../../../test-helpers/journey-state.js'
import { spyOnConfig } from '../../../test-helpers/config.js'
/** @import {DestinationTypeData} from '../../answer/destination-type/destination-type.js' */
/** @import {OnOffFarmData} from '../../answer/on-off-farm/on-off-farm.js' */

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
    expect(result.firstInvalidPage).toBeInstanceOf(KeptSeparatelyPage)
  })
})

describe('Biosecurity.config.isVisible', () => {
  afterEach(jest.restoreAllMocks)

  const { origin, destination } = validApplicationStateWithBioSecurity
  const appState = { origin, destination }

  it('should be not be visible if biosecurity flag is false', () => {
    spyOnConfig('featureFlags', { biosecurity: false })
    const isVisible = BiosecuritySection.config.isVisible(appState)
    expect(isVisible).toBe(false)
  })

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
