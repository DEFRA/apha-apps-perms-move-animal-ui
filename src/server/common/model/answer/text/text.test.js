import { TextAnswer } from './text.js'
/** @import {TextConfig} from './text.js' */

const maxLengthError = 'Text exceeds maximum length (40)'
const question = 'Enter your answer?'

/** @type {TextConfig} */
const textConfig = {
  payloadKey: 'textPayload',
  validation: {
    maxLength: { value: 40, message: maxLengthError },
    empty: { message: 'Text must not be empty' }
  }
}

class TestTextAnswer extends TextAnswer {
  static config = textConfig
}

class NoWhitespaceTextAnswer extends TextAnswer {
  static config = {
    ...textConfig,
    stripWhitespace: true
  }
}

const validPayload = {
  textPayload: 'some text'
}

const longAnswer = new Array(41).fill('a').join('')
const invalidPayload = {
  textPayload: longAnswer
}

describe('TextAnswer.new', () => {
  it('should strip away any irrelevant values', () => {
    const payload = { ...validPayload, nextPage: '/other/page' }
    const textAnswer = new TestTextAnswer(payload)

    expect(textAnswer._data).toEqual(validPayload)
  })
})

describe('TextAnswer.validate', () => {
  it('should error if max length is exceeded', () => {
    const textAnswer = new TestTextAnswer({
      textPayload: longAnswer
    })
    const { isValid, errors } = textAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textPayload: { text: textConfig.validation.maxLength.message }
    })
  })

  it('should error if max length is exceeded with a whitespace-filled string, if stripWhitespace is not', () => {
    const whitespace = new Array(40).fill(' ').join('')
    const textAnswer = new TestTextAnswer({
      textPayload: `a${whitespace}z`
    })
    const { isValid, errors } = textAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textPayload: { text: textConfig.validation.maxLength.message }
    })
  })

  it('should not error if the max length is exceeded after trimming input', () => {
    const whitespace = new Array(25).fill(' ').join('')
    const textAnswer = new TestTextAnswer({
      textPayload: `${whitespace}a${whitespace}`
    })
    const { isValid, errors } = textAnswer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should not error if max length is exceeded, after stripping whitespace (if configured)', () => {
    const whitespace = new Array(40).fill(' ').join('')
    const textAnswer = new NoWhitespaceTextAnswer({
      textPayload: `a${whitespace}z`
    })
    const { isValid, errors } = textAnswer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should error if the input is empty', () => {
    const textAnswer = new TestTextAnswer({ textPayload: '' })
    const { isValid, errors } = textAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textPayload: { text: textConfig.validation.empty.message }
    })
  })

  it('should error if the input is empty via being undefined', () => {
    const textAnswer = new TestTextAnswer()
    const { isValid, errors } = textAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textPayload: { text: textConfig.validation.empty.message }
    })
  })

  it('should error if the input is undefined', () => {
    const textAnswer = new TestTextAnswer({ textPayload: undefined })
    const { isValid, errors } = textAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textPayload: { text: textConfig.validation.empty.message }
    })
  })

  describe('TextAnswer.validate with pattern', () => {
    const regexValidationMessage = 'Text must conform to regex'

    class PatternValidationTextAnswer extends TextAnswer {
      static config = {
        ...textConfig,
        validation: {
          ...textConfig.validation,
          pattern: { regex: /^[0-9]+$/, message: regexValidationMessage }
        }
      }
    }

    it('should return an error for a regex pattern, if one is provided', () => {
      const textAnswer = new PatternValidationTextAnswer({
        textPayload: 'all letters, actually'
      })
      const { isValid, errors } = textAnswer.validate()

      expect(isValid).toBe(false)
      expect(errors).toEqual({
        textPayload: { text: regexValidationMessage }
      })
    })

    it('should return an valid if the regex pattern is matched', () => {
      const textAnswer = new PatternValidationTextAnswer({
        textPayload: '12345'
      })
      const { isValid, errors } = textAnswer.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should trim the string first, before validating', () => {
      const textAnswer = new PatternValidationTextAnswer({
        textPayload: '  12345  '
      })
      const { isValid, errors } = textAnswer.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })
  })
})

describe('TextAnswer.toState', () => {
  it('should replace missing data with blank string', () => {
    const textAnswer = new TestTextAnswer({})
    const data = textAnswer.toState()

    expect(data).toBe('')
  })

  it('should pass through valid data unaltered', () => {
    const textAnswer = new TestTextAnswer(validPayload)
    const data = textAnswer.toState()

    expect(data).toEqual(validPayload.textPayload)
  })

  it('should trim whitespace', () => {
    const textAnswer = new TestTextAnswer({
      textPayload: '  test value '
    })

    expect(textAnswer.toState()).toBe('test value')
  })

  it('should remove all whitespace (if configured)', () => {
    const textAnswer = new NoWhitespaceTextAnswer({
      textPayload: '  test value '
    })

    expect(textAnswer.toState()).toBe('testvalue')
  })
})

describe('TextAnswer.fromState', () => {
  it('should return just the value from the payload', () => {
    const textAnswer = new TestTextAnswer(validPayload)
    const state = textAnswer.toState()
    expect(TestTextAnswer.fromState(state).value).toEqual(
      validPayload.textPayload
    )
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(TestTextAnswer.fromState(undefined).value).toBeUndefined()
  })

  it('should return an empty object if the state is undefined', () => {
    expect(TestTextAnswer.fromState(undefined)._data).toEqual({})
  })
})

describe('TestAnswer.html', () => {
  it('should return the value if present', () => {
    const textAnswer = new TestTextAnswer(validPayload)
    expect(textAnswer.html).toBe(validPayload.textPayload)
  })

  it('should return an empty string if payload is not present', () => {
    const textAnswer = new TestTextAnswer({})
    expect(textAnswer.html).toBe('')
  })
})

describe('TestAnswer.viewModel (without any extra options)', () => {
  const textAnswer = new TestTextAnswer(invalidPayload)

  it('should return data to render without errors (if validate is false)', () => {
    expect(textAnswer.viewModel({ validate: false, question })).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'textPayload',
      name: 'textPayload',
      value: textAnswer.value
    })
  })

  it('should return data to render with errors (if validate is true)', () => {
    expect(textAnswer.viewModel({ validate: true, question })).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'textPayload',
      name: 'textPayload',
      value: textAnswer.value,
      errorMessage: { text: maxLengthError }
    })
  })
})

describe('TestAnswer.viewModel (with all optional options)', () => {
  /** @type {TextConfig} */
  const textConfigWithExtraOptions = {
    ...textConfig,
    type: 'email',
    autocomplete: 'email-address',
    spellcheck: false,
    characterWidth: 20,
    hint: 'Enter your email'
  }

  class ExtraOptionsTextAnswer extends TextAnswer {
    static config = textConfigWithExtraOptions
  }
  const textAnswer = new ExtraOptionsTextAnswer(invalidPayload)

  it('should return data to render without errors (if validate is false)', () => {
    expect(textAnswer.viewModel({ validate: false, question })).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'textPayload',
      name: 'textPayload',
      type: 'email',
      hint: { text: 'Enter your email' },
      spellcheck: false,
      autocomplete: 'email-address',
      classes: 'govuk-input--width-20',
      value: textAnswer.value
    })
  })

  it('should return data to render with errors (if validate is true)', () => {
    expect(textAnswer.viewModel({ validate: true, question })).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      id: 'textPayload',
      name: 'textPayload',
      type: 'email',
      hint: { text: 'Enter your email' },
      spellcheck: false,
      autocomplete: 'email-address',
      classes: 'govuk-input--width-20',
      value: textAnswer.value,
      errorMessage: { text: maxLengthError }
    })
  })
})

describe('TextAnswer.template', () => {
  it('should return the text model template', () => {
    const text = new TestTextAnswer(validPayload)
    expect(text.template).toBe('model/answer/text/text.njk')
  })
})
