import { TextAreaAnswer } from './text-area.js'
/** @import {TextAreaConfig} from './text-area.js' */

const maxLengthError = 'TextArea exceeds maximum length (40)'
const question = 'Enter your answer?'

/** @type {TextAreaConfig} */
const textAreaConfig = {
  payloadKey: 'textAreaPayload',
  validation: {
    maxLength: { value: 40, message: maxLengthError },
    empty: { message: 'TextArea must not be empty' }
  }
}

class TestTextAreaAnswer extends TextAreaAnswer {
  static config = textAreaConfig
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
    const textAreaAnswer = new TestTextAreaAnswer(payload)

    expect(textAreaAnswer._data).toEqual(validPayload)
  })
})

describe('TextAreaAnswer.validate', () => {
  it('should error if max length is exceeded', () => {
    const textAreaAnswer = new TestTextAreaAnswer({
      textAreaPayload: longAnswer
    })
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textAreaPayload: { text: textAreaConfig.validation.maxLength.message }
    })
  })

  it('should error if max length is exceeded with a whitespace-filled string, if stripWhitespace is not', () => {
    const whitespace = new Array(40).fill(' ').join('')
    const textAreaAnswer = new TestTextAreaAnswer({
      textAreaPayload: `a${whitespace}z`
    })
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textAreaPayload: { text: textAreaConfig.validation.maxLength.message }
    })
  })

  it('should not error if the max length is exceeded after trimming input', () => {
    const whitespace = new Array(25).fill(' ').join('')
    const textAreaAnswer = new TestTextAreaAnswer({
      textAreaPayload: `${whitespace}a${whitespace}`
    })
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should error if the input is empty', () => {
    const textAreaAnswer = new TestTextAreaAnswer({ textAreaPayload: '' })
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textAreaPayload: { text: textAreaConfig.validation.empty.message }
    })
  })

  it('should error if the input is empty via being undefined', () => {
    const textAreaAnswer = new TestTextAreaAnswer()
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textAreaPayload: { text: textAreaConfig.validation.empty.message }
    })
  })

  it('should error if the input is undefined', () => {
    const textAreaAnswer = new TestTextAreaAnswer({
      textAreaPayload: undefined
    })
    const { isValid, errors } = textAreaAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textAreaPayload: { text: textAreaConfig.validation.empty.message }
    })
  })

  describe('TextAreaAnswer.validate with pattern', () => {
    const regexValidationMessage = 'TextArea must conform to regex'

    class PatternValidationTextAreaAnswer extends TextAreaAnswer {
      static config = {
        ...textAreaConfig,
        validation: {
          ...textAreaConfig.validation,
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
    const textAreaAnswer = new TestTextAreaAnswer({})
    const data = textAreaAnswer.toState()

    expect(data).toBe('')
  })

  it('should pass through valid data unaltered', () => {
    const textAreaAnswer = new TestTextAreaAnswer(validPayload)
    const data = textAreaAnswer.toState()

    expect(data).toEqual(validPayload.textAreaPayload)
  })

  it('should trim whitespace', () => {
    const textAreaAnswer = new TestTextAreaAnswer({
      textAreaPayload: '  test value '
    })

    expect(textAreaAnswer.toState()).toBe('test value')
  })
})

describe('TextAreaAnswer.fromState', () => {
  it('should return just the value from the payload', () => {
    const textAreaAnswer = new TestTextAreaAnswer(validPayload)
    const state = textAreaAnswer.toState()
    expect(TestTextAreaAnswer.fromState(state).value).toEqual(
      validPayload.textAreaPayload
    )
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(TestTextAreaAnswer.fromState(undefined).value).toBeUndefined()
  })

  it('should return an empty object if the state is undefined', () => {
    expect(TestTextAreaAnswer.fromState(undefined)._data).toEqual({})
  })
})

describe('TestAnswer.html', () => {
  it('should return the value if present', () => {
    const textAreaAnswer = new TestTextAreaAnswer(validPayload)
    expect(textAreaAnswer.html).toBe(validPayload.textAreaPayload)
  })

  it('should return an empty string if payload is not present', () => {
    const textAreaAnswer = new TestTextAreaAnswer({})
    expect(textAreaAnswer.html).toBe('')
  })
})

describe('TestAnswer.viewModel (without any extra options)', () => {
  const textAreaAnswer = new TestTextAreaAnswer(invalidPayload)

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
    ...textAreaConfig,
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
    const textArea = new TestTextAreaAnswer(validPayload)
    expect(textArea.template).toBe('model/answer/text-area/text-area.njk')
  })
})
