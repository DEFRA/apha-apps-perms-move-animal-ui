import { Origin } from './origin.js'
import { OnOffFarm } from '../answer/on-off-farm.js'
import { CphNumber } from '../answer/cph-number.js'
import { Address } from '../answer/address.js'
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
  describe('validate', () => {
    it('should return valid if all nested objects are valid', () => {
      const originData = {
        onOffFarm: validOnOffFarm,
        cphNumber: validCphNumber,
        address: validAddress
      }
      const result = Origin.fromState(originData).validate()

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should return invalid if any nested object is invalid', () => {
      const originData = {
        onOffFarm: undefined,
        cphNumber: validCphNumber,
        address: validAddress
      }

      const result = Origin.fromState(originData).validate()

      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveProperty('origin')
    })

    describe('fromState', () => {
      it('should create an Origin instance with valid nested objects', () => {
        const originData = {
          onOffFarm: validOnOffFarm,
          cphNumber: validCphNumber,
          address: validAddress
        }

        const origin = Origin.fromState(originData)

        expect(origin).toBeInstanceOf(Origin)
        expect(origin._data?.onOffFarm).toBeInstanceOf(OnOffFarm)
        expect(origin._data?.cphNumber).toBeInstanceOf(CphNumber)
        expect(origin._data?.address).toBeInstanceOf(Address)
      })

      it('should handle undefined state gracefully', () => {
        const origin = Origin.fromState(undefined)

        expect(origin).toBeInstanceOf(Origin)
        expect(origin._data?.onOffFarm.value).toBeUndefined()
        expect(origin._data?.cphNumber.value).toBeUndefined()
        expect(origin._data?.address.value).toBeUndefined()
      })
    })
  })
})
