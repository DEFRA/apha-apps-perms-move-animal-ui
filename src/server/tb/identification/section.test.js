import { IdentificationSection } from './section.js'
import {
  validOriginSectionState,
  validDestinationSectionState,
  validLicenceSectionState,
  validBiosecuritySectionState,
  validIdentificationSectionState,
  validBiosecurityMapSectionState
} from '../../common/test-helpers/journey-state.js'
import { CalvesUnder42DaysOldPage } from '~/src/server/tb/identification/calves-under-42-days-old/index.js'
import { EarTagsPage } from './ear-tags/index.js'
import { TestingDatesPage } from './testing-dates/index.js'

const applicationStateWithAnimalIdentifiersSection = {
  origin: {
    ...validOriginSectionState,
    onOffFarm: 'on',
    originType: 'tb-restricted-farm'
  },
  destination: {
    ...validDestinationSectionState,
    destinationType: 'tb-restricted-farm',
    movementDate: {
      day: '01',
      month: '01',
      year: '2300'
    }
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

const mockRequest = /** @type {any} */ ({})

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
    expect(result.firstInvalidPageUrl).toBe(
      new CalvesUnder42DaysOldPage().urlPath
    )
  })
})

describe('Identification.config', () => {
  it('should be as expected', async () => {
    expect(IdentificationSection.config.key).toBe('identification')
    expect(IdentificationSection.config.title).toBe('Animal identification')
    expect(await IdentificationSection.config.isVisible({}, mockRequest)).toBe(
      false
    )
    expect(await IdentificationSection.config.isEnabled({}, mockRequest)).toBe(
      true
    )
    expect(IdentificationSection.config.summaryLink).toBe(
      '/identification/check-answers'
    )
  })
})

describe('Identification.config.isVisible', () => {
  afterEach(jest.restoreAllMocks)

  const { origin, destination } = applicationStateWithAnimalIdentifiersSection

  it('should not be visible if origin type is not restricted', async () => {
    const isVisible = await IdentificationSection.config.isVisible(
      {
        origin: { ...origin, originType: 'afu' },
        destination
      },
      mockRequest
    )

    expect(isVisible).toBe(false)
  })

  it('should not be visible if destination type is not restricted', async () => {
    const isVisible = await IdentificationSection.config.isVisible(
      {
        origin,
        destination: { ...destination, destinationType: 'afu' }
      },
      mockRequest
    )

    expect(isVisible).toBe(false)
  })

  it('should not be visible if movement is off', async () => {
    const isVisible = await IdentificationSection.config.isVisible(
      {
        origin: { ...origin, onOffFarm: 'off' },
        destination
      },
      mockRequest
    )

    expect(isVisible).toBe(false)
  })

  it('should not visible if the origin section is incomplete', async () => {
    const isVisible = await IdentificationSection.config.isVisible(
      {
        origin: { onOffFarm: origin.onOffFarm, originType: origin.originType },
        destination
      },
      mockRequest
    )

    expect(isVisible).toBe(false)
  })

  it('should not be visible if the destination section is incomplete', async () => {
    const isVisible = await IdentificationSection.config.isVisible(
      {
        origin,
        destination: { destinationType: destination.destinationType }
      },
      mockRequest
    )

    expect(isVisible).toBe(false)
  })

  it('should be visible if all conditions met', async () => {
    const isVisible = await IdentificationSection.config.isVisible(
      {
        origin,
        destination
      },
      mockRequest
    )

    expect(isVisible).toBe(true)
  })

  it('should be visible if moving off of an iso-unit', async () => {
    const isVisible = await IdentificationSection.config.isVisible(
      {
        origin: {
          ...origin,
          onOffFarm: 'off',
          originType: 'iso-unit'
        },
        destination: {
          ...destination,
          destinationType: 'slaughter' // valid destinationType for iso-unit
        }
      },
      mockRequest
    )

    expect(isVisible).toBe(true)
  })
})

describe('Identification.startPageFactory', () => {
  it('should return calvesUnder42DaysOldPage if origin is on farm', () => {
    const startPage = IdentificationSection.firstPageFactory({
      origin: { onOffFarm: 'on', originType: 'tb-restricted-farm' }
    })

    expect(startPage).toBeInstanceOf(CalvesUnder42DaysOldPage)
  })

  describe('coming from iso-unit', () => {
    it('should return earTagsPage if destination type is slaughter', () => {
      const startPage = IdentificationSection.firstPageFactory({
        origin: { onOffFarm: 'off', originType: 'iso-unit' },
        destination: { destinationType: 'slaughter' }
      })

      expect(startPage).toBeInstanceOf(EarTagsPage)
    })

    it('should return testingDatesPage if destination type is afu', () => {
      const startPage = IdentificationSection.firstPageFactory({
        origin: { onOffFarm: 'off', originType: 'iso-unit' },
        destination: { destinationType: 'afu' }
      })

      expect(startPage).toBeInstanceOf(TestingDatesPage)
    })
  })
})
