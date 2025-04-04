import { IdentificationSection } from './identification.js'
import {
  validOriginSectionState,
  validDestinationSectionState,
  validLicenceSectionState,
  validBiosecuritySectionState,
  validIdentificationSectionState,
  validBiosecurityMapSectionState
} from '../../../test-helpers/journey-state.js'
import { CalvesUnder42DaysOldPage } from '~/src/server/identification/calves-under-42-days-old/index.js'

const applicationStateWithAnimalIdentifiersSection = {
  origin: {
    ...validOriginSectionState,
    onOffFarm: 'on',
    originType: 'tb-restricted-farm'
  },
  destination: {
    ...validDestinationSectionState,
    destinationType: 'tb-restricted-farm'
  },
  identification: validIdentificationSectionState,
  licence: validLicenceSectionState,
  biosecurity: validBiosecuritySectionState,
  'biosecurity-map': validBiosecurityMapSectionState
}

const validIdentificationData = validIdentificationSectionState

const invalidIdentificationData = {
  calvesUnder42DaysOld: undefined
}

describe('Identification.validate', () => {
  it('should return valid if all nested objects are valid', () => {
    const identificationData = validIdentificationData
    const result = IdentificationSection.fromState({
      identification: identificationData
    }).validate()

    expect(result.isValid).toBe(true)
  })

  it('should return invalid if any nested object is invalid', () => {
    const result = IdentificationSection.fromState({
      identification: invalidIdentificationData
    }).validate()

    expect(result.isValid).toBe(false)
    expect(result.firstInvalidPage).toBeInstanceOf(CalvesUnder42DaysOldPage)
  })
})

describe('Identification.config', () => {
  it('should be as expected', () => {
    expect(IdentificationSection.config.key).toBe('identification')
    expect(IdentificationSection.config.title).toBe('Animal identification')
    expect(IdentificationSection.config.isVisible({})).toBe(false)
    expect(IdentificationSection.config.isEnabled({})).toBe(true)
    expect(IdentificationSection.config.summaryLink).toBe(
      '/identification/check-answers'
    )
  })
})

describe('Identification.config.isVisible', () => {
  afterEach(jest.restoreAllMocks)

  const { origin, destination } = applicationStateWithAnimalIdentifiersSection

  it('should not be visible origin type is not restricted', () => {
    const isVisible = IdentificationSection.config.isVisible({
      origin: { ...origin, originType: 'afu' },
      destination
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible destination type is not restricted', () => {
    const isVisible = IdentificationSection.config.isVisible({
      origin,
      destination: { ...destination, destinationType: 'afu' }
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible if movement is off', () => {
    const isVisible = IdentificationSection.config.isVisible({
      origin: { ...origin, onOffFarm: 'off' },
      destination
    })

    expect(isVisible).toBe(false)
  })

  it('should not visible if the origin section is incomplete', () => {
    const isVisible = IdentificationSection.config.isVisible({
      origin: { onOffFarm: origin.onOffFarm, originType: origin.originType },
      destination
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible if the destination section is incomplete', () => {
    const isVisible = IdentificationSection.config.isVisible({
      origin,
      destination: { destinationType: destination.destinationType }
    })

    expect(isVisible).toBe(false)
  })
})
