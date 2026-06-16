import { tbKeyFacts } from './tb-key-facts.js'

/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */
/** @import { TbApplicationModel } from './application.js' */

const createState = (overrides = {}) => ({
  origin: {},
  destination: {},
  licence: {},
  'biosecurity-map': {},
  ...overrides
})

/** @param {Record<string, any>} data */
const createSection = (data = {}) => ({
  getSectionAnswer: (questionKey) => {
    const value = data[questionKey]
    if (value === undefined) {
      return undefined
    }

    return {
      data: { value }
    }
  }
})

/** @param {RawApplicationState} state */
const createApplication = (state) => ({
  getSection: (sectionKey) => {
    if (!(sectionKey in state)) {
      return undefined
    }

    return createSection(state[sectionKey])
  }
})

/** @param {RawApplicationState} state */
const getKeyFacts = (state) =>
  tbKeyFacts(/** @type {TbApplicationModel} */ (createApplication(state)))

describe('tbKeyFacts', () => {
  describe('licence type determination', () => {
    const testCases = [
      { origin: 'market', destination: 'tb-restricted-farm', expected: 'TB15' },
      {
        origin: 'tb-restricted-farm',
        destination: 'dedicated-sale',
        expected: 'TB16e'
      },
      { origin: 'afu', destination: 'slaughter', expected: 'TB16e' },
      { origin: 'afu', destination: 'afu-or-market', expected: 'TB16e' },
      {
        origin: 'tb-restricted-farm',
        destination: 'slaughter',
        expected: 'TB24c'
      },
      { origin: 'other', destination: 'slaughter', expected: 'TB24c' },
      { origin: 'market', destination: 'market', expected: '' }
    ]

    testCases.forEach(({ origin, destination, expected }) => {
      it(`should return ${expected || 'empty string'} for ${origin} to ${destination}`, () => {
        const state = createState({
          origin: { originType: origin },
          destination: { destinationType: destination }
        })
        expect(getKeyFacts(state).licenceType).toBe(expected)
      })
    })
  })

  describe('requester determination', () => {
    it('should return origin when moving off farm', () => {
      const state = createState({
        origin: { onOffFarm: 'off', originType: 'tb-restricted-farm' }
      })
      expect(getKeyFacts(state).requester).toBe('origin')
    })

    it('should return destination when moving on farm', () => {
      const state = createState({
        origin: { onOffFarm: 'on', originType: 'tb-restricted-farm' }
      })
      expect(getKeyFacts(state).requester).toBe('destination')
    })
  })

  describe('numberOfCattle', () => {
    it.each([
      ['howManyAnimals', '5', 5],
      ['howManyAnimalsMaximum', '7', 7]
    ])(
      'should convert %s to numberOfCattle as integer',
      (field, value, expected) => {
        const destination =
          field === 'howManyAnimalsMaximum'
            ? { howManyAnimalsMaximum: value }
            : { howManyAnimals: value }

        const state = createState({
          origin: { onOffFarm: 'off', originType: 'tb-restricted-farm' },
          destination
        })

        expect(getKeyFacts(state).numberOfCattle).toBe(expected)
      }
    )

    it('should prefer howManyAnimals over howManyAnimalsMaximum', () => {
      const state = createState({
        destination: {
          howManyAnimals: '10',
          howManyAnimalsMaximum: '20'
        }
      })
      expect(getKeyFacts(state).numberOfCattle).toBe(10)
    })

    it.each([
      ['both fields missing', {}],
      ['empty string', { howManyAnimals: '' }],
      ['null', { howManyAnimals: null }],
      ['undefined', { howManyAnimals: undefined }]
    ])('should not include numberOfCattle when %s', (_, destination) => {
      const state = createState({ destination })
      expect(getKeyFacts(state).numberOfCattle).toBeUndefined()
    })
  })

  describe('requesterCph determination', () => {
    it('should use destination CPH when moving on farm', () => {
      const state = createState({
        origin: { onOffFarm: 'on', cphNumber: '11/111/1111' },
        destination: { destinationFarmCph: '22/222/2222' }
      })
      expect(getKeyFacts(state).requesterCph).toBe('22/222/2222')
    })

    it('should use origin CPH when moving off farm', () => {
      const state = createState({
        origin: { onOffFarm: 'off', cphNumber: '11/111/1111' },
        destination: { destinationFarmCph: '22/222/2222' }
      })
      expect(getKeyFacts(state).requesterCph).toBe('11/111/1111')
    })

    it('should not set requesterCph when CPH is missing', () => {
      const stateOnFarm = createState({
        origin: { onOffFarm: 'on' }
      })
      const stateOffFarm = createState({
        origin: { onOffFarm: 'off' }
      })
      expect(getKeyFacts(stateOnFarm).requesterCph).toBeUndefined()
      expect(getKeyFacts(stateOffFarm).requesterCph).toBeUndefined()
    })
  })

  describe('keeper name determination', () => {
    const names = {
      fullName: { firstName: 'John', lastName: 'Doe' },
      yourName: { firstName: 'Jane', lastName: 'Smith' }
    }

    it('should set both keeper names for TB-restricted on farm', () => {
      const state = createState({
        origin: { onOffFarm: 'on', originType: 'tb-restricted-farm' },
        licence: names
      })
      const result = getKeyFacts(state)
      expect(result.originKeeperName).toEqual(names.fullName)
      expect(result.destinationKeeperName).toEqual(names.yourName)
    })

    it('should set destinationKeeperName for ON farm unrestricted movements', () => {
      const state = createState({
        origin: { onOffFarm: 'on', originType: 'unrestricted-farm' },
        licence: names
      })
      expect(getKeyFacts(state).destinationKeeperName).toEqual(names.fullName)
      expect(getKeyFacts(state).originKeeperName).toBeUndefined()
    })

    it('should not set destinationKeeperName for non-eligible movements', () => {
      const state = createState({
        origin: { onOffFarm: 'off', originType: 'tb-restricted-farm' },
        licence: names
      })
      expect(getKeyFacts(state).destinationKeeperName).toBeUndefined()
    })

    describe('destinationKeeperName logic based on origin restriction', () => {
      it('should use yourName when origin is restricted and yourName is present', () => {
        const state = createState({
          origin: { onOffFarm: 'on', originType: 'tb-restricted-farm' },
          licence: names
        })
        expect(getKeyFacts(state).destinationKeeperName).toEqual(names.yourName)
      })

      it('should use fullName when origin is unrestricted and fullName is present', () => {
        const state = createState({
          origin: { onOffFarm: 'on', originType: 'unrestricted-farm' },
          licence: names
        })
        expect(getKeyFacts(state).destinationKeeperName).toEqual(names.fullName)
      })

      it('should not set destinationKeeperName when origin is restricted but yourName is null', () => {
        const state = createState({
          origin: { onOffFarm: 'on', originType: 'tb-restricted-farm' },
          licence: { fullName: names.fullName, yourName: null }
        })
        expect(getKeyFacts(state).destinationKeeperName).toBeUndefined()
      })

      it('should not set destinationKeeperName when origin is unrestricted and fullName is null', () => {
        const state = createState({
          origin: { onOffFarm: 'on', originType: 'unrestricted-farm' },
          licence: { fullName: null, yourName: names.yourName }
        })
        expect(getKeyFacts(state).destinationKeeperName).toBeUndefined()
      })
    })
  })

  describe('biosecurity maps extraction', () => {
    it('should extract path when map is uploaded', () => {
      const state = createState({
        'biosecurity-map': {
          'upload-plan': {
            path: 'test-key-123',
            skipped: false
          }
        }
      })
      expect(getKeyFacts(state).biosecurityMaps).toEqual(['test-key-123'])
    })

    it('should not include map when skipped or missing', () => {
      const skippedState = createState({
        'biosecurity-map': {
          'upload-plan': {
            path: 'test-key',
            skipped: true
          }
        }
      })
      const emptyState = createState()

      expect(getKeyFacts(skippedState).biosecurityMaps).toBeUndefined()
      expect(getKeyFacts(emptyState).biosecurityMaps).toBeUndefined()
    })
  })

  describe('complete transformation', () => {
    it('should transform all fields correctly', () => {
      const state = createState({
        origin: {
          onOffFarm: 'on',
          originType: 'tb-restricted-farm',
          cphNumber: '11/111/1111',
          address: {
            addressLine1: '123 Farm Rd',
            addressTown: 'Town',
            addressPostcode: 'AB1 2CD'
          }
        },
        destination: {
          destinationType: 'tb-restricted-farm',
          destinationFarmCph: '22/222/2222',
          destinationFarmAddress: {
            addressLine1: '456 Ranch Rd',
            addressTown: 'City',
            addressPostcode: 'CD3 4EF'
          },
          howManyAnimals: '10',
          additionalInfo: 'Test info'
        },
        licence: {
          fullName: { firstName: 'John', lastName: 'Doe' },
          yourName: { firstName: 'Jane', lastName: 'Smith' }
        },
        'biosecurity-map': {
          'upload-plan': {
            path: 'map-key',
            skipped: false
          }
        }
      })

      const result = getKeyFacts(state)

      expect(result).toMatchObject({
        licenceType: 'TB16',
        requester: 'destination',
        movementDirection: 'on',
        additionalInformation: 'Test info',
        numberOfCattle: 10,
        originCph: '11/111/1111',
        destinationCph: '22/222/2222',
        requesterCph: '22/222/2222',
        biosecurityMaps: ['map-key']
      })
      expect(result.originKeeperName).toBeDefined()
      expect(result.destinationKeeperName).toBeDefined()
      expect(result.originAddress).toBeDefined()
      expect(result.destinationAddress).toBeDefined()
    })

    it('should handle minimal state with defaults', () => {
      const state = createState()
      const result = getKeyFacts(state)

      expect(result).toEqual({
        licenceType: '',
        requester: 'origin',
        movementDirection: undefined,
        additionalInformation: ''
      })
    })
  })
})
