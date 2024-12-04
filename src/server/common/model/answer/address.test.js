import { Address } from './address.js'

const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressLine2: '24-593 Federation Drive',
  addressTown: 'San Francisco',
  addressCounty: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

describe('Address.validate', () => {
  it('should return true for valid address', () => {
    const address = new Address(validAddress)
    const { isValid } = address.validate()

    expect(isValid).toBe(true)
  })

  it('should return false for too short input', () => {
    const address = new Address({
      ...validAddress,
      addressLine1: 'A'.repeat(256)
    })
    const { isValid, errors } = address.validate()

    expect(isValid).toBe(false)
    expect(errors.addressLine1.text).toBe(
      'Address line 1 must be no longer than 255 characters'
    )
  })

  it('should return true for optional field with empty input', () => {
    const address = new Address({
      addressLine1: 'Starfleet Headquarters',
      addressTown: 'San Francisco',
      addressPostcode: 'RG24 8RR'
    })

    const { isValid } = address.validate()

    expect(isValid).toBe(true)
  })

  describe('validatePostcode', () => {
    describe('postcode formats', () => {
      const postcodes = [
        'RG248RR',
        'RG24 8RR',
        'RG2 4RR',
        'RG2 4 8RR',
        'rg248rr',
        'RG24 8rr',
        'SW1A 1AA',
        'SW1A1AA',
        'SW1A 1Aa',
        'NE1 4DG'
      ]

      for (const postcode of postcodes) {
        it(`should return true for valid postcode format: ${postcode}`, () => {
          const address = new Address({
            ...validAddress,
            addressPostcode: postcode
          })
          const { isValid } = address.validate()

          expect(isValid).toBe(true)
        })
      }

      it('should return false for malformed postcode', () => {
        const address = new Address({
          ...validAddress,
          addressPostcode: 'invalid postcode'
        })

        const { isValid, errors } = address.validate()

        expect(isValid).toBe(false)
        expect(errors.addressPostcode.text).toBe('Enter a full UK postcode')
      })
    })

    it('should return false for missing required fields', () => {
      const address = new Address({
        addressLine1: '',
        addressLine2: '',
        addressTown: '',
        addressCounty: '',
        addressPostcode: ''
      })

      const { isValid, errors } = address.validate()
      expect(isValid).toBe(false)
      expect(errors).toEqual({
        addressLine1: {
          text: 'Enter address line 1, typically the building and street'
        },
        addressTown: { text: 'Enter town or city' },
        addressPostcode: { text: 'Enter postcode' }
      })
    })
  })
})

describe('Address.toState', () => {
  it('should extract state from payload', () => {
    const address = new Address(validAddress)
    expect(address.toState()).toEqual(validAddress)
  })

  it('should default missing fields to empty string', () => {
    const address = new Address()
    expect(address.toState()).toEqual({
      addressLine1: '',
      addressLine2: '',
      addressTown: '',
      addressCounty: '',
      addressPostcode: ''
    })
  })
})

describe('Address.fromState', () => {
  it('should return the state as-is as payload, since the state is already a valid payload', () => {
    const address = new Address(validAddress)
    const state = address.toState()
    expect(Address.fromState(state)._data).toEqual(validAddress)
  })

  it('should store undefined if the state isn\'t defined', () => {
    expect(Address.fromState(undefined)._data).toEqual(undefined)
  })
})
