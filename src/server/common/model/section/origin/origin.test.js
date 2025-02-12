import { OriginSection } from './origin.js'
import { OnOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
/** @import { OnOffFarmData } from '../../answer/on-off-farm/on-off-farm.js' */

const validCphNumber = '12/345/6789'
const validOriginType = 'afu'
/** @type {OnOffFarmData} */
const validOnOffFarm = 'off'
const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressTown: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

describe('Origin', () => {
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const originData = {
        onOffFarm: validOnOffFarm,
        originType: validOriginType,
        cphNumber: validCphNumber,
        address: validAddress
      }
      const result = OriginSection.fromState({ origin: originData }).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const originData = {
        onOffFarm: undefined,
        originType: validOriginType,
        cphNumber: validCphNumber,
        address: validAddress
      }

      const result = OriginSection.fromState({ origin: originData }).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(OnOffFarmPage)
    })
  })
})
