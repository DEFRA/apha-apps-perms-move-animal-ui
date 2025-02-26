import { validOriginSectionState } from '../../../test-helpers/journey-state.js'
import { OriginSection } from './origin.js'
import { OnOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'

describe('Origin', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const result = OriginSection.fromState({
        origin: validOriginSectionState
      }).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const originData = {
        ...validOriginSectionState,
        onOffFarm: undefined
      }

      const result = OriginSection.fromState({ origin: originData }).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(OnOffFarmPage)
    })
  })
})
