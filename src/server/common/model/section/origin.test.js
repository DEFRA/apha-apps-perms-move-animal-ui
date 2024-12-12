import { Origin } from './origin.js'
import { OnOffFarm } from '../answer/on-off-farm.js'
import { CphNumber } from '../answer/cph-number.js'
import { Address } from '../answer/address.js'
import { OnOffFarmPage } from '~/src/server/origin/on-off-farm/index.js'
/** @import { OnOffFarmData } from '../answer/on-off-farm.js' */

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

      const origin = Origin.fromState(originData)

      expect(origin).toBeInstanceOf(Origin)
      expect(origin.onOffFarm).toBeInstanceOf(OnOffFarm)
      expect(origin.cphNumber).toBeInstanceOf(CphNumber)
      expect(origin.address).toBeInstanceOf(Address)
    })

    it('should handle undefined state gracefully', () => {
      const origin = Origin.fromState(undefined)

      expect(origin).toBeInstanceOf(Origin)
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
      const result = Origin.fromState(originData).validate()

      expect(result.isValid).toBe(true)
    })

    it('should return invalid if any nested object is invalid', () => {
      const originData = {
        onOffFarm: undefined,
        cphNumber: validCphNumber,
        address: validAddress
      }

      const result = Origin.fromState(originData).validate()

      expect(result.isValid).toBe(false)
      expect(result.firstInvalidPage).toBeInstanceOf(OnOffFarmPage)
    })
  })
})
