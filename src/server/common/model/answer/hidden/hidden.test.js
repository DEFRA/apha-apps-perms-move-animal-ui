import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
import { HiddenAnswer } from './hidden.js'
/** @import {HiddenAnswerConfig} from './hidden.js' */

const question = 'Enter your answer?'
const configuredHiddenValue = 'yes'

/** @type {HiddenAnswerConfig} */
const hiddenAnswerConfig = {
  payloadKey: 'hiddenAnswerPayload',
  value: configuredHiddenValue
}

class TestHiddenAnswer extends HiddenAnswer {
  static config = hiddenAnswerConfig
}

const validPayload = {
  hiddenAnswerPayload: configuredHiddenValue
}

describe('HiddenAnswer.new', () => {
  it('should strip away any irrelevant values', () => {
    const payload = { ...validPayload, nextPage: '/other/page' }
    const hiddenAnswer = new TestHiddenAnswer(payload)

    expect(hiddenAnswer._data).toEqual(validPayload)
  })
})

describe('HiddenAnswer.validate', () => {
  it('should fail validation if the input is undefined', () => {
    const hiddenAnswer = new TestHiddenAnswer()
    const { isValid, errors } = hiddenAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({})
  })

  it('should pass validation if the input value matches the configured one', () => {
    const hiddenAnswer = new TestHiddenAnswer(validPayload)
    const { isValid, errors } = hiddenAnswer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })
})

describe('HiddenAnswer.toState', () => {
  it('should replace missing data with blank string', () => {
    const hiddenAnswer = new TestHiddenAnswer({})
    const data = hiddenAnswer.toState()

    expect(data).toBe('')
  })

  it('should pass through valid data unaltered', () => {
    const hiddenAnswer = new TestHiddenAnswer(validPayload)
    const data = hiddenAnswer.toState()

    expect(data).toEqual(validPayload.hiddenAnswerPayload)
  })
})

describe('HiddenAnswer.fromState', () => {
  it('should return just the value from the payload', () => {
    const hiddenAnswer = new TestHiddenAnswer(validPayload)
    const state = hiddenAnswer.toState()
    expect(TestHiddenAnswer.fromState(state).value).toEqual(
      validPayload.hiddenAnswerPayload
    )
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(TestHiddenAnswer.fromState(undefined).value).toBeUndefined()
  })

  it('should return an empty object if the state is undefined', () => {
    expect(TestHiddenAnswer.fromState(undefined)._data).toEqual({})
  })
})

describe('TestAnswer.html', () => {
  it('should throw not implemented error', () => {
    const hiddenAnswer = new TestHiddenAnswer(validPayload)
    expect(() => hiddenAnswer.html).toThrow(NotImplementedError)
  })
})

describe('TestAnswer.viewModel', () => {
  const hiddenAnswer = new TestHiddenAnswer(validPayload)

  it('should return expected data to render', async () => {
    expect(await hiddenAnswer.viewModel({ question })).toEqual({
      id: hiddenAnswerConfig.payloadKey,
      name: hiddenAnswerConfig.payloadKey,
      question,
      value: hiddenAnswerConfig.value
    })
  })
})

describe('HiddenAnswer.template', () => {
  it('should return the text model template', () => {
    const text = new TestHiddenAnswer(validPayload)
    expect(text.template).toBe('model/answer/hidden/hidden.njk')
  })
})
