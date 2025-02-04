import { AddressAnswer } from './address.js'

const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressLine2: '24-593 Federation Drive',
  addressTown: 'San Francisco Bay',
  addressCounty: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

describe('Address.new', () => {
  it('should strip away any irrelevant values', () => {
    const payload = { ...validAddress, nextPage: '/other/page' }
    const address = new AddressAnswer(payload)

    expect(address._data).toEqual(validAddress)
  })

  it('should trim any whitespace from the values', () => {
    const payload = {
      addressLine1: '  Starfleet Headquarters  ',
      addressTown: '  San Francisco  ',
      addressPostcode: '  RG24 8RR  '
    }
    const address = new AddressAnswer(payload)

    expect(address.value).toEqual({
      addressLine1: 'Starfleet Headquarters',
      addressTown: 'San Francisco',
      addressPostcode: 'RG24 8RR'
    })
  })

  it('should graceully handle optional values', () => {
    const validAddressWithOptionalsMissing = {
      addressLine1: validAddress.addressLine1,
      addressTown: validAddress.addressTown,
      addressPostcode: validAddress.addressPostcode
    }
    const address = new AddressAnswer(validAddressWithOptionalsMissing)

    expect(address._data).toEqual(validAddressWithOptionalsMissing)
  })
})

describe('Address.validate', () => {
  it('should return true for valid address', () => {
    const address = new AddressAnswer(validAddress)
    const { isValid } = address.validate()

    expect(isValid).toBe(true)
  })

  it('should return false for too long input', () => {
    const address = new AddressAnswer({
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
    const address = new AddressAnswer({
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
          const address = new AddressAnswer({
            ...validAddress,
            addressPostcode: postcode
          })
          const { isValid } = address.validate()

          expect(isValid).toBe(true)
        })
      }

      it('should return false for malformed postcode', () => {
        const address = new AddressAnswer({
          ...validAddress,
          addressPostcode: 'invalid postcode'
        })

        const { isValid, errors } = address.validate()

        expect(isValid).toBe(false)
        expect(errors.addressPostcode.text).toBe('Enter a full UK postcode')
      })

      it('should return false for empty postcode', () => {
        const address = new AddressAnswer({
          ...validAddress,
          addressPostcode: ''
        })

        const { isValid, errors } = address.validate()

        expect(isValid).toBe(false)
        expect(errors.addressPostcode.text).toBe('Enter postcode')
      })
    })

    it('should return false for missing required fields', () => {
      const address = new AddressAnswer({
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
    const address = new AddressAnswer(validAddress)
    expect(address.toState()).toEqual(validAddress)
  })

  it('should default missing fields to empty string', () => {
    const address = new AddressAnswer()
    expect(address.toState()).toBeUndefined()
  })
})

describe('Address.fromState', () => {
  it('should return the state as-is as payload, since the state is already a valid payload', () => {
    const address = new AddressAnswer(validAddress)
    const state = address.toState()
    expect(AddressAnswer.fromState(state)._data).toEqual(validAddress)
  })

  it("should store undefined if the state isn't defined", () => {
    expect(AddressAnswer.fromState(undefined)._data).toBeUndefined()
  })
})

describe('Address.html', () => {
  it('should return formatted HTML string for a complete address', () => {
    const address = new AddressAnswer(validAddress)
    const expectedHtml = [
      'Starfleet Headquarters',
      '24-593 Federation Drive',
      'San Francisco Bay',
      'San Francisco',
      'RG24 8RR'
    ].join('<br />')

    expect(address.html).toBe(expectedHtml)
  })

  it('should return formatted HTML string for an address with missing optional fields', () => {
    const address = new AddressAnswer({
      addressLine1: 'Starfleet Headquarters',
      addressTown: 'San Francisco',
      addressPostcode: 'RG24 8RR'
    })
    const expectedHtml = [
      'Starfleet Headquarters',
      'San Francisco',
      'RG24 8RR'
    ].join('<br />')

    expect(address.html).toBe(expectedHtml)
  })

  it('should return an empty string for an address with all fields empty', () => {
    const address = new AddressAnswer({
      addressLine1: '',
      addressLine2: '',
      addressTown: '',
      addressCounty: '',
      addressPostcode: ''
    })

    expect(address.html).toBe('')
  })

  it('should return an empty string for an undefined address', () => {
    const address = new AddressAnswer(undefined)

    expect(address.html).toBe('')
  })
})

describe('Address.viewModel', () => {
  const longInput = new Array(500).fill('a').join('')
  const invalidAddress = {
    addressLine1: '',
    addressLine2: longInput,
    addressTown: '',
    addressCounty: longInput,
    addressPostcode: 'invalid post code'
  }
  const address = new AddressAnswer(invalidAddress)
  const question = 'What is the address of your farm or premises?'

  it('should return the value without errors (if validate is false)', () => {
    expect(address.viewModel({ validate: false, question })).toEqual({
      value: address.value,
      question
    })
  })

  it('should return the value with errors (if valiate is true)', () => {
    expect(address.viewModel({ validate: true, question })).toEqual({
      question,
      value: address.value,
      errors: address.validate().errors
    })
  })
})

describe('Address.template', () => {
  it('should return the address model template', () => {
    const address = new AddressAnswer(validAddress)
    expect(address.template).toBe('model/answer/address/address.njk')
  })
})
