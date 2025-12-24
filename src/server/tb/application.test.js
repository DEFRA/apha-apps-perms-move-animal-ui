import { TbApplicationModel } from './application.js'
import { validApplicationState } from '../common/test-helpers/journey-state.js'

/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

describe('TbApplicationModel', () => {
  describe('getKeyFacts', () => {
    it('should return key facts from valid application state', () => {
      const keyFacts = TbApplicationModel.getKeyFacts(validApplicationState)

      expect(keyFacts).toBeDefined()
      expect(keyFacts).toHaveProperty('licenceType')
      expect(keyFacts).toHaveProperty('requester')
      expect(keyFacts).toHaveProperty('movementDirection')
    })

    it('should correctly determine licence type for TB-restricted to TB-restricted', () => {
      const keyFacts = TbApplicationModel.getKeyFacts(validApplicationState)

      expect(keyFacts.licenceType).toBe('TB16')
    })

    it('should correctly set requester as destination for on-farm TB-restricted movement', () => {
      const keyFacts = TbApplicationModel.getKeyFacts(validApplicationState)

      expect(keyFacts.requester).toBe('destination')
    })

    it('should include CPH numbers when present', () => {
      const keyFacts = TbApplicationModel.getKeyFacts(validApplicationState)

      expect(keyFacts.originCph).toBe('12/345/6789')
      expect(keyFacts.destinationCph).toBe('12/345/6789')
    })

    it('should include keeper names when present', () => {
      const keyFacts = TbApplicationModel.getKeyFacts(validApplicationState)

      expect(keyFacts.originKeeperName).toEqual({
        firstName: 'Kathryn',
        lastName: 'Janeway'
      })
      expect(keyFacts.destinationKeeperName).toEqual({
        firstName: 'Jean-Luc',
        lastName: 'Picard'
      })
    })

    it('should include biosecurity maps when uploaded', () => {
      const keyFacts = TbApplicationModel.getKeyFacts(validApplicationState)

      expect(keyFacts.biosecurityMaps).toBeDefined()
      expect(keyFacts.biosecurityMaps).toContain(
        'biosecurity-map/41572cf8-2e37-495e-9ad2-0b0f23f1b277/3d3c2a09-2888-4199-9bd6-ac7eda3125f0'
      )
    })

    it('should set requesterCph based on movement direction', () => {
      const keyFacts = TbApplicationModel.getKeyFacts(validApplicationState)

      // On farm movement should use destination CPH
      expect(keyFacts.requesterCph).toBe('12/345/6789')
    })

    it('should handle off-farm movement correctly', () => {
      /** @type {RawApplicationState} */
      const offFarmState = {
        ...validApplicationState,
        origin: {
          ...validApplicationState.origin,
          onOffFarm: 'off',
          originType: 'tb-restricted-farm',
          cphNumber: '11/111/1111'
        },
        destination: {
          ...validApplicationState.destination,
          destinationType: 'slaughter',
          destinationFarmCph: '22/222/2222'
        }
      }

      const keyFacts = TbApplicationModel.getKeyFacts(offFarmState)

      expect(keyFacts.requester).toBe('origin')
      expect(keyFacts.requesterCph).toBe('11/111/1111')
      expect(keyFacts.licenceType).toBe('TB24c')
    })

    it('should handle missing optional fields gracefully', () => {
      /** @type {RawApplicationState} */
      const minimalState = {
        origin: {
          onOffFarm: 'on',
          originType: 'tb-restricted-farm'
        },
        destination: {
          destinationType: 'tb-restricted-farm'
        },
        licence: {},
        'biosecurity-map': {}
      }

      const keyFacts = TbApplicationModel.getKeyFacts(minimalState)

      expect(keyFacts.licenceType).toBe('TB16')
      expect(keyFacts.requester).toBe('destination')
      expect(keyFacts.originCph).toBeUndefined()
      expect(keyFacts.destinationCph).toBeUndefined()
      expect(keyFacts.originKeeperName).toBeUndefined()
      expect(keyFacts.biosecurityMaps).toBeUndefined()
    })

    it('should parse numberOfCattle as integer', () => {
      /** @type {RawApplicationState} */
      const stateWithAnimals = {
        ...validApplicationState,
        destination: {
          ...validApplicationState.destination,
          howManyAnimals: '25'
        }
      }

      const keyFacts = TbApplicationModel.getKeyFacts(stateWithAnimals)

      expect(keyFacts.numberOfCattle).toBe(25)
      expect(typeof keyFacts.numberOfCattle).toBe('number')
    })

    it('should include addresses when present', () => {
      const keyFacts = TbApplicationModel.getKeyFacts(validApplicationState)

      expect(keyFacts.originAddress).toBeDefined()
      expect(keyFacts.destinationAddress).toBeDefined()
    })
  })

  describe('version', () => {
    it('should return correct version', () => {
      const model = new TbApplicationModel({})
      expect(model.version).toEqual({ major: 2, minor: 1 })
    })
  })

  describe('journeyId', () => {
    it('should return correct journey ID', () => {
      const model = new TbApplicationModel({})
      expect(model.journeyId).toBe(
        'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_TB_ENGLAND'
      )
    })
  })
})
