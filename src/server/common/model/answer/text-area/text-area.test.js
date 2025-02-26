import { TextAreaAnswer } from './text-area.js'
/** @import {TextAreaConfig} from './text-area.js' */

const maxLengthError = 'TextArea exceeds maximum length (40)'
const question = 'Enter your answer?'

/** @type {TextAreaConfig} */
const optionalTextAreaConfig = {
  payloadKey: 'textAreaPayload',
  validation: {
    maxLength: { value: 40, message: maxLengthError }
  }
}

const requiredTextAreaConfig = {
  ...optionalTextAreaConfig,
  validation: {
    ...optionalTextAreaConfig.validation,
    empty: { message: 'TextArea must not be empty' }
  }
}

class TestOptionalTextAreaAnswer extends TextAreaAnswer {
  static config = optionalTextAreaConfig
}

class TestRequiredTextAreaAnswer extends TextAreaAnswer {
  static config = requiredTextAreaConfig
}

const validPayload = {
  textAreaPayload: 'some textArea'
}

const longAnswer = new Array(41).fill('a').join('')
const invalidPayload = {
  textAreaPayload: longAnswer
}

describe('TextAreaAnswer.new', () => {
  it('should strip away any irrelevant values', () => {
    const payload = { ...validPayload, nextPage: '/other/page' }
    const textAreaAnswer = new TestOptionalTextAreaAnswer(payload)

    expect(textAreaAnswer._data).toEqual(validPayload)
  })
})

describe('TextAreaAnswer.validate', () => {
  it('should error if max length is exceeded', () => {
    const textAreaAnswer = new TestOptionalTextAreaAnswer({
      textAreaPayload: longAnswer
    })
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textAreaPayload: {
        text: optionalTextAreaConfig.validation.maxLength.message
      }
    })
  })

  it('should error if max length is exceeded with a whitespace-filled string, if stripWhitespace is not', () => {
    const whitespace = new Array(40).fill(' ').join('')
    const textAreaAnswer = new TestOptionalTextAreaAnswer({
      textAreaPayload: `a${whitespace}z`
    })
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textAreaPayload: {
        text: optionalTextAreaConfig.validation.maxLength.message
      }
    })
  })

  it('should not error if the max length is exceeded after trimming input', () => {
    const whitespace = new Array(25).fill(' ').join('')
    const textAreaAnswer = new TestOptionalTextAreaAnswer({
      textAreaPayload: `${whitespace}a${whitespace}`
    })
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  describe('when the field is optional (default behaviour)', () => {
    it('should not error if the input is an empty string', () => {
      const textAreaAnswer = new TestOptionalTextAreaAnswer({
        textAreaPayload: ''
      })
      const { isValid, errors } = textAreaAnswer.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should still error if the input is empty via being undefined', () => {
      const textAreaAnswer = new TestOptionalTextAreaAnswer({
        textAreaPayload: null
      })

      expect(textAreaAnswer.validate().isValid).toBe(false)
    })

    it('should still error if the input is undefined', () => {
      const textAreaAnswer = new TestOptionalTextAreaAnswer({
        textAreaPayload: undefined
      })

      expect(textAreaAnswer.validate().isValid).toBe(false)
    })
  })

  describe('when the field cannot be empty', () => {
    it('should error if the input is empty', () => {
      const textAreaAnswer = new TestRequiredTextAreaAnswer({
        textAreaPayload: ''
      })
      const { isValid, errors } = textAreaAnswer.validate()

      expect(isValid).toBe(false)
      expect(errors).toEqual({
        textAreaPayload: {
          text: requiredTextAreaConfig.validation.empty.message
        }
      })
    })

    it('should error if the input is empty via being undefined', () => {
      const textAreaAnswer = new TestRequiredTextAreaAnswer()
      const { isValid, errors } = textAreaAnswer.validate()

      expect(isValid).toBe(false)
      expect(errors).toEqual({
        textAreaPayload: {
          text: requiredTextAreaConfig.validation.empty.message
        }
      })
    })

    it('should error if the input is undefined', () => {
      const textAreaAnswer = new TestRequiredTextAreaAnswer({
        textAreaPayload: undefined
      })
      const { isValid, errors } = textAreaAnswer.validate()

      expect(isValid).toBe(false)
      expect(errors).toEqual({
        textAreaPayload: {
          text: requiredTextAreaConfig.validation.empty.message
        }
      })
    })
  })

  describe('TextAreaAnswer.validate with pattern', () => {
    const regexValidationMessage = 'TextArea must conform to regex'

    class PatternValidationTextAreaAnswer extends TextAreaAnswer {
      static config = {
        ...optionalTextAreaConfig,
        validation: {
          ...optionalTextAreaConfig.validation,
          pattern: { regex: /^[0-9]+$/, message: regexValidationMessage }
        }
      }
    }

    it('should return an error for a regex pattern, if one is provided', () => {
      const textAreaAnswer = new PatternValidationTextAreaAnswer({
        textAreaPayload: 'all letters, actually'
      })
      const { isValid, errors } = textAreaAnswer.validate()

      expect(isValid).toBe(false)
      expect(errors).toEqual({
        textAreaPayload: { text: regexValidationMessage }
      })
    })

    it('should return an valid if the regex pattern is matched', () => {
      const textAreaAnswer = new PatternValidationTextAreaAnswer({
        textAreaPayload: '12345'
      })
      const { isValid, errors } = textAreaAnswer.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should trim the string first, before validating', () => {
      const textAreaAnswer = new PatternValidationTextAreaAnswer({
        textAreaPayload: '  12345  '
      })
      const { isValid, errors } = textAreaAnswer.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })
  })
})

describe('TextAreaAnswer.toState', () => {
  it('should replace missing data with blank string', () => {
    const textAreaAnswer = new TestOptionalTextAreaAnswer({})
    const data = textAreaAnswer.toState()

    expect(data).toBe('')
  })

  it('should pass through valid data unaltered', () => {
    const textAreaAnswer = new TestOptionalTextAreaAnswer(validPayload)
    const data = textAreaAnswer.toState()

    expect(data).toEqual(validPayload.textAreaPayload)
  })

  it('should trim whitespace', () => {
    const textAreaAnswer = new TestOptionalTextAreaAnswer({
      textAreaPayload: '  test value '
    })

    expect(textAreaAnswer.toState()).toBe('test value')
  })
})

describe('TextAreaAnswer.fromState', () => {
  it('should return just the value from the payload', () => {
    const textAreaAnswer = new TestOptionalTextAreaAnswer(validPayload)
    const state = textAreaAnswer.toState()
    expect(TestOptionalTextAreaAnswer.fromState(state).value).toEqual(
      validPayload.textAreaPayload
    )
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(
      TestOptionalTextAreaAnswer.fromState(undefined).value
    ).toBeUndefined()
  })

  it('should return an empty object if the state is undefined', () => {
    expect(TestOptionalTextAreaAnswer.fromState(undefined)._data).toEqual({})
  })
})

describe('TestAnswer.html', () => {
  it('should return the value if present', () => {
    const textAreaAnswer = new TestOptionalTextAreaAnswer(validPayload)
    expect(textAreaAnswer.html).toBe(validPayload.textAreaPayload)
  })

  it('should return an empty string if payload is not present', () => {
    const textAreaAnswer = new TestOptionalTextAreaAnswer({})
    expect(textAreaAnswer.html).toBe('')
  })

  it('should return a string after replacing newlines with <br>', () => {
    const textAreaAnswer = new TestOptionalTextAreaAnswer({
      textAreaPayload: 'line one\nline two'
    })
    expect(textAreaAnswer.html).toBe('line one<br />line two')
  })
})

describe('TestAnswer.viewModel (without any extra options)', () => {
  const textAreaAnswer = new TestOptionalTextAreaAnswer(invalidPayload)

  it('should return data to render without errors (if validate is false)', () => {
    expect(textAreaAnswer.viewModel({ validate: false, question })).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'textAreaPayload',
      name: 'textAreaPayload',
      value: textAreaAnswer.value
    })
  })

  it('should return data to render with errors (if validate is true)', () => {
    expect(textAreaAnswer.viewModel({ validate: true, question })).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'textAreaPayload',
      name: 'textAreaPayload',
      value: textAreaAnswer.value,
      errorMessage: { text: maxLengthError }
    })
  })
})

describe('TestAnswer.viewModel (with all optional options)', () => {
  /** @type {TextAreaConfig} */
  const textAreaConfigWithExtraOptions = {
    ...optionalTextAreaConfig,
    autocomplete: 'input-data',
    spellcheck: false,
    rows: 10,
    hint: 'Enter the data'
  }

  class ExtraOptionsTextAreaAnswer extends TextAreaAnswer {
    static config = textAreaConfigWithExtraOptions
  }
  const textAreaAnswer = new ExtraOptionsTextAreaAnswer(invalidPayload)

  const expectedViewModel = {
    label: {
      text: question,
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'textAreaPayload',
    name: 'textAreaPayload',
    hint: { text: 'Enter the data' },
    spellcheck: false,
    autocomplete: 'input-data',
    rows: 10,
    value: textAreaAnswer.value
  }

  it('should return data to render without errors (if validate is false)', () => {
    expect(textAreaAnswer.viewModel({ validate: false, question })).toEqual(
      expectedViewModel
    )
  })

  it('should return data to render with errors (if validate is true)', () => {
    expect(textAreaAnswer.viewModel({ validate: true, question })).toEqual({
      ...expectedViewModel,
      errorMessage: { text: maxLengthError }
    })
  })
})

describe('TextAreaAnswer.template', () => {
  it('should return the textArea model template', () => {
    const textArea = new TestOptionalTextAreaAnswer(validPayload)
    expect(textArea.template).toBe('model/answer/text-area/text-area.njk')
  })
})
