import { FullNameAnswer } from './full-name.js'

/** @import {FullNameConfig} from '../full-name/full-name.js' */

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

  describe('when the config is overwritten', () => {
    const testConfig = {
      validation: {
        firstName: {
          empty: {
            message: 'Cannot be empty'
          }
        },
        lastName: {
          empty: {
            message: 'Cannot be empty'
          }
        }
      }
    }

    class TestFullNameAnswer extends FullNameAnswer {
      /** @type {FullNameConfig} */
      static config = testConfig
    }

    it('should return false and the overwritten error messages for malformed input', () => {
      const fullName = new TestFullNameAnswer({
        firstName: '',
        lastName: ''
      })

      const { isValid, errors } = fullName.validate()

      expect(isValid).toBe(false)
      expect(errors.firstName.text).toBe(
        testConfig.validation.firstName.empty.message
      )

      expect(errors.lastName.text).toBe(
        testConfig.validation.lastName.empty.message
      )
    })
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

describe('FullName.viewModel', () => {
  const longInput = new Array(51).fill('a').join('')
  const invalidFullName = {
    firstName: longInput,
    lastName: longInput
  }
  const name = new FullNameAnswer(invalidFullName)
  const question = 'What is the name of the CPH owner?'

  it('should return the value without errors (if validate is false)', () => {
    expect(name.viewModel({ validate: false, question })).toEqual({
      value: name.value,
      question
    })
  })

  it('should return the value with errors (if valiate is true)', () => {
    expect(name.viewModel({ validate: true, question })).toEqual({
      value: name.value,
      errors: name.validate().errors,
      question
    })
  })
})

describe('FullNameAnswer.template', () => {
  it('should return the full name model template', () => {
    const fullName = new FullNameAnswer(validFullNamePayload)
    expect(fullName.template).toBe('model/answer/full-name/full-name.njk')
  })
})
