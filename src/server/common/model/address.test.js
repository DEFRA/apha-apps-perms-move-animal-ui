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
    const { isValid } = Address.validate(validAddress)

    expect(isValid).toBe(true)
  })

  it('should return false for too short input', () => {
    const { isValid, errors } = Address.validate({
      ...validAddress,
      addressLine1: 'A'.repeat(256)
    })

    expect(isValid).toBe(false)
    expect(errors.addressLine1.text).toBe(
      'Address line 1 must be no longer than 255 characters'
    )
  })

  it('should return true for optional field with empty input', () => {
    const { isValid } = Address.validate({
      addressLine1: 'Starfleet Headquarters',
      addressTown: 'San Francisco',
      addressPostcode: 'RG24 8RR'
    })

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
          const { isValid } = Address.validate({
            ...validAddress,
            addressPostcode: postcode
          })

          expect(isValid).toBe(true)
        })
      }

      it('should return false for malformed postcode', () => {
        const { isValid, errors } = Address.validate({
          ...validAddress,
          addressPostcode: 'invalid postcode'
        })

        expect(isValid).toBe(false)
        expect(errors.addressPostcode.text).toBe('Enter a full UK postcode')
      })
    })

    it('should return false for missing required fields', () => {
      const originAddress = {
        addressLine1: '',
        addressLine2: '',
        addressTown: '',
        addressCounty: '',
        addressPostcode: ''
      }
      const { isValid, errors } = Address.validate(originAddress)
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
    expect(Address.toState(validAddress)).toEqual(validAddress)
  })

  it('should default missing fields to empty string', () => {
    expect(Address.toState({})).toEqual({
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
    const state = Address.toState(validAddress)
    expect(Address.fromState(state)).toEqual(state)
  })

  it('should return an empty object if the state is undefined', () => {
    expect(Address.fromState(undefined)).toEqual({})
  })
})
