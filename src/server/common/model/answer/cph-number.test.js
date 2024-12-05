import { CphNumber } from './cph-number.js'

const validCphNumberPayload = {
  cphNumber: '12/456/7899'
}

describe('#CphNumber.validate', () => {
  it('should return true for valid cphNumber', () => {
    const cphNumber = new CphNumber(validCphNumberPayload)
    const { isValid, errors } = cphNumber.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should return false for an empty input', () => {
    const cphNumber = new CphNumber()

    const { isValid, errors } = cphNumber.validate()

    expect(isValid).toBe(false)
    expect(errors.cphNumber.text).toBe('Enter the farm or premises CPH number')
  })

  it('should return false for too short input', () => {
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
  it('should replace missing data with blank string', () => {
    const cphNumber = new CphNumber()
    const data = cphNumber.toState()

    expect(data).toBe('')
  })

  it('should pass through valid data unaltered', () => {
    const cphNumber = new CphNumber(validCphNumberPayload)
    const data = cphNumber.toState()

    expect(data).toEqual(validCphNumberPayload.cphNumber)
  })

  it('should remove whitespace', () => {
    const cphNumber = new CphNumber({
      cphNumber: '  12/4 56/789 9 '
    })

    expect(cphNumber.toState()).toBe('12/456/7899')
  })
})

describe('#CphNumber.fromState', () => {
  it('should return just the cphNumber from the payload', () => {
    const cphNumber = new CphNumber(validCphNumberPayload)
    const state = cphNumber.toState()
    expect(CphNumber.fromState(state).value).toEqual(
      validCphNumberPayload.cphNumber
    )
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(CphNumber.fromState(undefined).value).toBeUndefined()
  })

  it('should return an empty object if the state is undefined', () => {
    expect(CphNumber.fromState(undefined)._data).toBeUndefined()
  })
})

describe('#CphNumber.html', () => {
  it('should return the cphNumber if present', () => {
    const cphNumber = new CphNumber(validCphNumberPayload)
    expect(cphNumber.html).toBe(validCphNumberPayload.cphNumber)
  })

  it('should return an empty string if cphNumber is not present', () => {
    const cphNumber = new CphNumber()
    expect(cphNumber.html).toBe('')
  })
})
