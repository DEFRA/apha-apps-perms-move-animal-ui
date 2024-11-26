import { CphNumber } from './cph-number.js'

const validCphNumber = {
  cphNumber: '12/456/7899'
}

describe('#CphNumber.validate', () => {
  test('should return true for valid cphNumber', () => {
    const cphNumber = new CphNumber(validCphNumber)
    const { isValid, errors } = cphNumber.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  test('should return false for an empty input', () => {
    const cphNumber = new CphNumber({})

    const { isValid, errors } = cphNumber.validate()

    expect(isValid).toBe(false)
    expect(errors.cphNumber.text).toBe('Enter the farm or premises CPH number')
  })

  test('should return false for too short input', () => {
    const cphNumber = new CphNumber({
      cphNumber: '1/2/3'
    })

    const { isValid, errors } = cphNumber.validate()

    expect(isValid).toBe(false)
    expect(errors.cphNumber.text).toBe(
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })
})

describe('#CphNumber.toState', () => {
  test('should replace missing data with blank string', () => {
    const cphNumber = new CphNumber({})
    const data = cphNumber.toState()

    expect(data.cphNumber).toBe('')
  })

  test('should pass through valid data unaltered', () => {
    const cphNumber = new CphNumber(validCphNumber)
    const data = cphNumber.toState()

    expect(data).toEqual(validCphNumber)
  })

  test('should remove whitespace', () => {
    const cphNumber = new CphNumber({
      cphNumber: '  12/4 56/789 9 '
    })

    expect(cphNumber.toState().cphNumber).toBe('12/456/7899')
  })
})

describe('#CphNumber.fromState', () => {
  it('should return just the cphNumber from the payload', () => {
    const cphNumber = new CphNumber(validCphNumber)
    const state = cphNumber.toState()
    expect(CphNumber.fromState(state).value).toEqual(validCphNumber.cphNumber)
  })

  it('should return an empty object if the state is undefined', () => {
    expect(CphNumber.fromState(undefined)).toEqual({})
  })
})
