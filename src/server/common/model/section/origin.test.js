import { Origin } from './origin.js'
import { OnOffFarm } from '../answer/on-off-farm.js'
import { CphNumber } from '../answer/cph-number.js'
import { Address } from '../answer/address.js'

const cphNumber = '12/345/6789'
const onOffFarm = 'off'
const address = {
  addressLine1: 'Starfleet Headquarters',
  addressTown: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

describe('Origin', () => {
  describe('fromState', () => {
    it('should create an Origin instance with valid nested objects', () => {
      const originData = {
        onOffFarm,
        cphNumber,
        address
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
      expect(origin._data?.address.value).toEqual({
        addressCounty: '',
        addressLine1: '',
        addressLine2: '',
        addressPostcode: '',
        addressTown: ''
      })
    })
  })
})
