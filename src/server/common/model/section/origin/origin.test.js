import { OriginSection } from './origin.js'
import { OnOffFarmAnswer } from '../../answer/on-off-farm/on-off-farm.js'
import { CphNumberAnswer } from '../../answer/cph-number/cph-number.js'
import { AddressAnswer } from '../../answer/address/address.js'
import { OnOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
/** @import { OnOffFarmData } from '../../answer/on-off-farm/on-off-farm.js' */

const validCphNumber = '12/345/6789'
/** @type OnOffFarmData */
const validOnOffFarm = 'off'
const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressTown: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

describe('Origin', () => {
  describe('fromState', () => {
    it('should create an Origin instance with valid nested objects', () => {
      const originData = {
        onOffFarm: validOnOffFarm,
        cphNumber: validCphNumber,
        address: validAddress
      }

      const origin = OriginSection.fromState(originData)

      expect(origin).toBeInstanceOf(OriginSection)
      expect(origin.onOffFarm).toBeInstanceOf(OnOffFarmAnswer)
      expect(origin.cphNumber).toBeInstanceOf(CphNumberAnswer)
      expect(origin.address).toBeInstanceOf(AddressAnswer)
    })

    it('should handle undefined state gracefully', () => {
      const origin = OriginSection.fromState(undefined)

      expect(origin).toBeInstanceOf(OriginSection)
      expect(origin.onOffFarm.value).toBeUndefined()
      expect(origin.cphNumber.value).toBeUndefined()
      expect(origin.address.value).toBeUndefined()
    })
  })

  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const originData = {
        onOffFarm: validOnOffFarm,
        cphNumber: validCphNumber,
        address: validAddress
      }
      const result = OriginSection.fromState(originData).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const originData = {
        onOffFarm: undefined,
        cphNumber: validCphNumber,
        address: validAddress
      }

      const result = OriginSection.fromState(originData).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(OnOffFarmPage)
    })
  })
})