import { tbKeyFacts } from './tb-key-facts.js'

/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

const createState = (overrides = {}) => ({
  origin: {},
  destination: {},
  licence: {},
  'biosecurity-map': {},
  ...overrides
})

describe('tbKeyFacts', () => {
  describe('licence type determination', () => {
    const testCases = [
      { origin: 'market', destination: 'tb-restricted-farm', expected: 'TB15' },
      { origin: 'unrestricted-farm', destination: 'zoo', expected: 'TB15' },
      {
        origin: 'after-import-location',
        destination: 'lab',
        expected: 'TB15'
      },
      { origin: 'tb-restricted-farm', destination: 'zoo', expected: 'TB16' },
      { origin: 'lab', destination: 'other', expected: 'TB16' },
      {
        origin: 'tb-restricted-farm',
        destination: 'dedicated-sale',
        expected: 'TB16e'
      },
      { origin: 'zoo', destination: 'afu', expected: 'TB16e' },
      { origin: 'afu', destination: 'slaughter', expected: 'TB16e' },
      { origin: 'afu', destination: 'market-afu', expected: 'TB16e' },
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
        expect(tbKeyFacts(state).licenceType).toBe(expected)
      })
    })
  })

  describe('requester determination', () => {
    it('should return origin when moving off farm', () => {
      const state = createState({
        origin: { onOffFarm: 'off', originType: 'tb-restricted-farm' }
      })
      expect(tbKeyFacts(state).requester).toBe('origin')
    })

    it('should return destination when moving on farm', () => {
      const state = createState({
        origin: { onOffFarm: 'on', originType: 'tb-restricted-farm' }
      })
      expect(tbKeyFacts(state).requester).toBe('destination')
    })
  })

  describe('requesterCph determination', () => {
    it('should use destination CPH when moving on farm', () => {
      const state = createState({
        origin: { onOffFarm: 'on', cphNumber: '11/111/1111' },
        destination: { destinationFarmCph: '22/222/2222' }
      })
      expect(tbKeyFacts(state).requesterCph).toBe('22/222/2222')
    })

    it('should use origin CPH when moving off farm', () => {
      const state = createState({
        origin: { onOffFarm: 'off', cphNumber: '11/111/1111' },
        destination: { destinationFarmCph: '22/222/2222' }
      })
      expect(tbKeyFacts(state).requesterCph).toBe('11/111/1111')
    })

    it('should not set requesterCph when CPH is missing', () => {
      const stateOnFarm = createState({
        origin: { onOffFarm: 'on' }
      })
      const stateOffFarm = createState({
        origin: { onOffFarm: 'off' }
      })
      expect(tbKeyFacts(stateOnFarm).requesterCph).toBeUndefined()
      expect(tbKeyFacts(stateOffFarm).requesterCph).toBeUndefined()
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
      const result = tbKeyFacts(state)
      expect(result.originKeeperName).toEqual(names.fullName)
      expect(result.destinationKeeperName).toEqual(names.yourName)
    })

    it('should set destinationKeeperName for ON farm unrestricted movements', () => {
      const state = createState({
        origin: { onOffFarm: 'on', originType: 'unrestricted-farm' },
        licence: names
      })
      // For ON farm from unrestricted origin, destination name should be fullName
      expect(tbKeyFacts(state).destinationKeeperName).toEqual(names.fullName)
      // Should not set origin name for ON farm from unrestricted origin
      expect(tbKeyFacts(state).originKeeperName).toBeUndefined()
    })

    it('should not set destinationKeeperName for non-eligible movements', () => {
      const state = createState({
        origin: { onOffFarm: 'off', originType: 'tb-restricted-farm' },
        licence: names
      })
      expect(tbKeyFacts(state).destinationKeeperName).toBeUndefined()
    })
  })

  describe('biosecurity maps extraction', () => {
    it('should extract S3 key when file is uploaded', () => {
      const state = createState({
        'biosecurity-map': {
          'upload-plan': {
            status: {
              uploadStatus: 'ready',
              form: { file: { s3Key: 'test-key-123' } }
            }
          }
        }
      })
      expect(tbKeyFacts(state).biosecurityMaps).toEqual(['test-key-123'])
    })

    it('should not include map when skipped or missing', () => {
      const skippedState = createState({
        'biosecurity-map': {
          'upload-plan': {
            status: {
              uploadStatus: 'skipped',
              form: { file: { s3Key: 'test-key' } }
            }
          }
        }
      })
      const emptyState = createState()

      expect(tbKeyFacts(skippedState).biosecurityMaps).toBeUndefined()
      expect(tbKeyFacts(emptyState).biosecurityMaps).toBeUndefined()
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
          destinationType: 'zoo',
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
            status: {
              uploadStatus: 'ready',
              form: { file: { s3Key: 'map-key' } }
            }
          }
        }
      })

      const result = tbKeyFacts(state)

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
      const result = tbKeyFacts(state)

      expect(result).toEqual({
        licenceType: '',
        requester: 'origin',
        movementDirection: undefined,
        additionalInformation: ''
      })
    })
  })
})
