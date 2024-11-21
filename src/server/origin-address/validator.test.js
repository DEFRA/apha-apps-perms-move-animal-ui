import validateAddress from './validator.js'

const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressLine2: '24-593 Federation Drive',
  addressTown: 'San Francisco',
  addressCounty: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

describe('#AddressValidator', () => {
  test('should return true for valid address', () => {
    const { isValid } = validateAddress(validAddress)

    expect(isValid).toBe(true)
  })

  test('should return false for too short input', () => {
    const { isValid, errors } = validateAddress({
      ...validAddress,
      addressLine1: 'A'.repeat(256)
    })

    expect(isValid).toBe(false)
    expect(errors.addressLine1.text).toBe(
      'Address line 1 must be no longer than 255 characters'
    )
  })

  test('should return true for optional field with empty input', () => {
    const { isValid } = validateAddress({
      addressLine1: 'Starfleet Headquarters',
      addressTown: 'San Francisco',
      addressPostcode: 'RG24 8RR'
    })

    expect(isValid).toBe(true)
  })

  describe('validatePostcode', () => {
    test('should return true for valid postcode', () => {
      const { isValid } = validateAddress(validAddress)

      expect(isValid).toBe(true)
    })

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
        test(`should return true for valid postcode format: ${postcode}`, () => {
          const { isValid } = validateAddress({
            ...validAddress,
            addressPostcode: postcode
          })

          expect(isValid).toBe(true)
        })
      }

      test('should return false for malformed postcode', () => {
        const { isValid, errors } = validateAddress({
          ...validAddress,
          addressPostcode: 'invalid postcode'
        })

        expect(isValid).toBe(false)
        expect(errors.addressPostcode.text).toBe('Enter a full UK postcode')
      })
    })
  })

  describe('validateOriginAddress', () => {
    test('should return false for missing required fields', () => {
      const originAddress = {
        addressLine1: '',
        addressLine2: '',
        addressTown: '',
        addressCounty: '',
        addressPostcode: ''
      }
      const { isValid, errors } = validateAddress(originAddress)
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
