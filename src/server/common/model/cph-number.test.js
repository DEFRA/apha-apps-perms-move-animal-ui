import { CphNumber } from './cph-number.js'

const validCphNumber = {
  cphNumber: '12/456/7899'
}

describe('#CphNumber.validate', () => {
  test('should return true for valid cphNumber', () => {
    const { isValid, errors } = CphNumber.validate(validCphNumber)

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  test('should return false for an empty input', () => {
    const { isValid, errors } = CphNumber.validate({
      cphNumber: ''
    })

    expect(isValid).toBe(false)
    expect(errors.cphNumber.text).toBe('Enter the farm or premises CPH number')
  })

  test('should return false for too short input', () => {
    const { isValid, errors } = CphNumber.validate({
      cphNumber: '1/2/3'
    })

    expect(isValid).toBe(false)
    expect(errors.cphNumber.text).toBe(
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })
})

describe('#CphNumber.toState', () => {
  test('should replace missing data with blank string', () => {
    const data = CphNumber.toState({})

    expect(data).toBe('')
  })

  test('should pass through valid data unaltered', () => {
    const data = CphNumber.toState(validCphNumber)

    expect(data).toEqual(validCphNumber.cphNumber)
  })

  test('should remove whitespace', () => {
    const data = CphNumber.toState({
      cphNumber: '  12/4 56/789 9 '
    })

    expect(data).toBe('12/456/7899')
  })
})

describe('#CphNumber.fromState', () => {
  it('should return just the cphNumber from the payload', () => {
    const state = CphNumber.toState(validCphNumber)
    expect(CphNumber.fromState(state)).toEqual(validCphNumber)
  })

  it('should return an empty object if the state is undefined', () => {
    expect(CphNumber.fromState(undefined)).toEqual({})
  })
})
