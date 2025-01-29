import { textAnswerFactory } from './text.js'
/** @import {TextConfig} from './text.js' */

/** @type {TextConfig} */
const textConfig = {
  payloadKey: 'textPayload',
  validation: {
    maxLength: { value: 40, message: 'Text exceeds maximum length (40)' },
    empty: { message: 'Text must not be empty' }
  }
}

const TestTextAnswer = textAnswerFactory(textConfig)

const validPayload = {
  textPayload: 'some text'
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
      textPayload: new Array(41).fill('a').join('')
    })
    const { isValid, errors } = textAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      textPayload: { text: textConfig.validation.maxLength.message }
    })
  })

  it('should error if the input is empty', () => {
    const textAnswer = new TestTextAnswer({ textPayload: '' })
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

    const PatternValidationTextAnswer = textAnswerFactory({
      ...textConfig,
      validation: {
        ...textConfig.validation,
        pattern: { regex: /^[0-9]+$/, message: regexValidationMessage }
      }
    })

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

    it('should strip the string first, before validating', () => {
      const textAnswer = new PatternValidationTextAnswer({
        textPayload: '12345'
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
    const NoWhitespaceTextAnswer = textAnswerFactory({
      ...textConfig,
      stripWhitespace: true
    })

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
