import { FullNameAnswer } from './fullName.js'

const maxLength = 50

const validFullNamePayload = {
  firstName: 'Jean-Luc',
  lastName: 'Picard'
}

describe('#FullName.validate', () => {
  it('should return true for valid fullName', () => {
    const fullName = new FullNameAnswer(validFullNamePayload)

    const { isValid } = fullName.validate()

    expect(isValid).toBe(true)
  })

  it('should return false for malformed input', () => {
    const fullName = new FullNameAnswer({
      firstName: '',
      lastName: ''
    })

    const { isValid, errors } = fullName.validate()

    expect(isValid).toBe(false)
    expect(errors.firstName.text).toBe(
      'Enter the first name of the County Parish Holding (CPH) owner'
    )

    expect(errors.lastName.text).toBe(
      'Enter the last name of the County Parish Holding (CPH) owner'
    )
  })

  it('should return false for input that is too long', () => {
    const fullName = new FullNameAnswer({
      firstName: Array(maxLength + 1)
        .fill('a')
        .join(''),
      lastName: Array(maxLength + 1)
        .fill('a')
        .join('')
    })

    const { isValid, errors } = fullName.validate()

    expect(isValid).toBe(false)
    expect(errors.firstName.text).toBe(
      `First name must be no longer than ${maxLength} characters`
    )

    expect(errors.lastName.text).toBe(
      `Last name must be no longer than ${maxLength} characters`
    )
  })
})

describe('#FullName.toState', () => {
  it('should replace missing data with blank string', () => {
    const fullName = new FullNameAnswer()
    const data = fullName.toState()

    expect(data.firstName).toBe('')
    expect(data.lastName).toBe('')
  })

  it('should pass through valid data unaltered', () => {
    const fullName = new FullNameAnswer(validFullNamePayload)
    const data = fullName.toState()

    expect(data).toEqual(validFullNamePayload)
  })

  it("shouldn't remove whitespace", () => {
    const fullName = new FullNameAnswer({
      firstName: 'Jean Luc',
      lastName: 'Picard'
    })

    expect(fullName.toState()).toEqual({
      firstName: 'Jean Luc',
      lastName: 'Picard'
    })
  })
})

describe('#FullName.fromState', () => {
  it('should return just the fullName from the payload', () => {
    const fullName = new FullNameAnswer(validFullNamePayload)
    const state = fullName.toState()
    expect(FullNameAnswer.fromState(state).value).toEqual({
      firstName: 'Jean-Luc',
      lastName: 'Picard'
    })
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(FullNameAnswer.fromState(undefined).value).toBeUndefined()
  })

  it('should return an empty object if the state is undefined', () => {
    expect(FullNameAnswer.fromState(undefined)._data).toBeUndefined()
  })
})

describe('#FullName.html', () => {
  it('should return the fullName if present', () => {
    const fullName = new FullNameAnswer(validFullNamePayload)
    expect(fullName.html).toBe(
      validFullNamePayload.firstName + ' ' + validFullNamePayload.lastName
    )
  })

  it('should return an empty string if fullName is not present', () => {
    const fullName = new FullNameAnswer()
    expect(fullName.html).toBe(' ')
  })
})
