import path from 'node:path'
import { fallbackTranslate } from '../../../test-helpers/translate.js'
import { FullNameAnswer } from './full-name.js'

/** @import {FullNameConfig} from '../full-name/full-name.js' */

const maxLength = 50
const explanation = 'test hint'

const validFullNamePayload = {
  firstName: 'Jean-Luc',
  lastName: 'Picard'
}

const testConfig = {
  explanation,
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

describe('#FullName.validate', () => {
  it('should return true for valid fullName', () => {
    const fullName = new TestFullNameAnswer(validFullNamePayload)

    const { isValid } = fullName.validate()

    expect(isValid).toBe(true)
  })

  it('should return false for malformed input', () => {
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

  it('should return false for input that is too long', () => {
    const fullName = new TestFullNameAnswer({
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
    expect(fullName.validate(fallbackTranslate).errors).toEqual(errors)
  })

  it.each([
    [
      'en',
      'First name must be no longer than 50 characters',
      'Last name must be no longer than 50 characters'
    ],
    [
      'cy',
      "Rhaid i'r enw cyntaf fod yn ddim hirach na 50 nod",
      "Rhaid i'r cyfenw fod yn ddim hirach na 50 nod"
    ]
  ])(
    'should translate maximum-length errors into %s',
    async (locale, firstNameMessage, lastNameMessage) => {
      const { I18n } = jest.requireActual('i18n')
      const i18n = new I18n({
        locales: ['en', 'cy'],
        defaultLocale: 'en',
        directory: path.resolve('src/config/i18n'),
        objectNotation: true,
        updateFiles: false
      })
      const translate = (key, fallback, params) => {
        if (!key) {
          return fallback
        }
        const result = i18n.__({ phrase: key, locale }, params)
        return result === key ? fallback : result
      }
      const fullName = new TestFullNameAnswer({
        firstName: 'a'.repeat(maxLength + 1),
        lastName: 'a'.repeat(maxLength + 1)
      })
      const expectedErrors = {
        firstName: { text: firstNameMessage },
        lastName: { text: lastNameMessage }
      }

      expect(fullName.validate(translate).errors).toEqual(expectedErrors)
      const viewModel = await fullName.viewModel({
        question: 'What is your name?',
        validate: true,
        translate
      })
      expect(viewModel.errors).toEqual(expectedErrors)
    }
  )
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
    const fullName = new TestFullNameAnswer(validFullNamePayload)
    const state = fullName.toState()
    expect(TestFullNameAnswer.fromState(state).value).toEqual({
      firstName: 'Jean-Luc',
      lastName: 'Picard'
    })
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(TestFullNameAnswer.fromState(undefined).value).toBeUndefined()
  })

  it('should return an empty object if the state is undefined', () => {
    expect(TestFullNameAnswer.fromState(undefined)._data).toBeUndefined()
  })
})

describe('#FullName.html', () => {
  it('should return the fullName if present', () => {
    const fullName = new TestFullNameAnswer(validFullNamePayload)
    expect(fullName.html).toBe(
      validFullNamePayload.firstName + ' ' + validFullNamePayload.lastName
    )
  })

  it('should return an empty string if fullName is not present', () => {
    const fullName = new TestFullNameAnswer()
    expect(fullName.html).toBe(' ')
  })

  it('should return the escaped fullName', () => {
    const fullName = new TestFullNameAnswer({
      firstName: '<Jean>',
      lastName: '<Picard>'
    })
    expect(fullName.html).toBe('&lt;Jean&gt; &lt;Picard&gt;')
  })
})

describe('FullName.viewModel', () => {
  const longInput = new Array(51).fill('a').join('')
  const invalidFullName = {
    firstName: longInput,
    lastName: longInput
  }
  const name = new TestFullNameAnswer(invalidFullName)
  const question = 'What is the name of the CPH owner?'

  it('should return the value without errors (if validate is false)', async () => {
    expect(
      await name.viewModel({
        translate: fallbackTranslate,
        validate: false,
        question
      })
    ).toEqual({
      value: name.value,
      question,
      explanation
    })
  })

  it('should return the value with errors (if valiate is true)', async () => {
    expect(
      await name.viewModel({
        translate: fallbackTranslate,
        validate: true,
        question
      })
    ).toEqual({
      value: name.value,
      errors: name.validate().errors,
      question,
      explanation
    })
  })
})

describe('FullNameAnswer.template', () => {
  it('should return the full name model template', () => {
    const fullName = new TestFullNameAnswer(validFullNamePayload)
    expect(fullName.template).toBe('model/answer/full-name/full-name.njk')
  })
})
