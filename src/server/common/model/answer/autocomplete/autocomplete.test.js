import { AutocompleteAnswer } from './autocomplete.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
/** @import {AutocompleteConfig} from './autocomplete.js' */

const emptyError = 'Select an option from the list'
const question = 'Choose an option'

/** @type {AutocompleteConfig} */
const autocompleteConfig = {
  payloadKey: 'autocompletePayload',
  validation: {
    empty: { message: emptyError }
  },
  items: () =>
    Promise.resolve([
      { value: 'option1', text: 'Option 1' },
      { value: 'option2', text: 'Option 2' },
      { value: 'option3', text: 'Option 3' }
    ])
}

/** @type {AutocompleteConfig} */
const autocompleteConfigWithHint = {
  ...autocompleteConfig,
  hint: 'Please select an option from the list',
  characterWidth: 20,
  isPageHeading: false
}

class TestAutocompleteAnswer extends AutocompleteAnswer {
  static config = autocompleteConfig
}

class TestAutocompleteAnswerWithHint extends AutocompleteAnswer {
  static config = autocompleteConfigWithHint
}

const validPayload = {
  autocompletePayload: 'option1'
}

const invalidPayload = {
  autocompletePayload: ''
}

describe('AutocompleteAnswer.constructor', () => {
  it('should strip away any irrelevant values', () => {
    const payload = { ...validPayload, nextPage: '/other/page' }
    const autocompleteAnswer = new TestAutocompleteAnswer(payload)

    expect(autocompleteAnswer._data).toEqual(validPayload)
  })

  it('should handle undefined data', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer()
    expect(autocompleteAnswer._data).toBeUndefined()
  })

  it('should handle empty object', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer({})
    expect(autocompleteAnswer._data).toEqual({ autocompletePayload: undefined })
  })
})

describe('AutocompleteAnswer.config', () => {
  it('should return the static config from the instance', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(validPayload)
    expect(autocompleteAnswer.config).toBe(TestAutocompleteAnswer.config)
  })

  it('should throw NotImplementedError for base class', () => {
    expect(() => AutocompleteAnswer.config).toThrow(NotImplementedError)
    expect(() => AutocompleteAnswer.config).toThrow('Not Implemented')
  })
})

describe('AutocompleteAnswer.value', () => {
  it('should return the value from the payload', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(validPayload)
    expect(autocompleteAnswer.value).toBe('option1')
  })

  it('should return undefined if no data', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer()
    expect(autocompleteAnswer.value).toBeUndefined()
  })

  it('should return undefined if payload key is missing', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer({})
    expect(autocompleteAnswer.value).toBeUndefined()
  })
})

describe('AutocompleteAnswer.html', () => {
  it('should return escaped HTML value if present', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(validPayload)
    expect(autocompleteAnswer.html).toBe('option1')
  })

  it('should return empty string if no data', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer()
    expect(autocompleteAnswer.html).toBe('')
  })

  it('should return empty string if payload key is missing', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer({})
    expect(autocompleteAnswer.html).toBe('')
  })

  it('should escape HTML characters', () => {
    const payload = { autocompletePayload: '<script>alert("XSS")</script>' }
    const autocompleteAnswer = new TestAutocompleteAnswer(payload)
    expect(autocompleteAnswer.html).toBe(
      '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
    )
  })

  it('should escape special characters', () => {
    const payload = { autocompletePayload: 'Test & \'quotes\' "and" more' }
    const autocompleteAnswer = new TestAutocompleteAnswer(payload)
    expect(autocompleteAnswer.html).toBe(
      'Test &amp; &#39;quotes&#39; &quot;and&quot; more'
    )
  })
})

describe('AutocompleteAnswer.template', () => {
  it('should return the correct template path', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(validPayload)
    expect(autocompleteAnswer.template).toBe(
      'model/answer/autocomplete/autocomplete.njk'
    )
  })
})

describe('AutocompleteAnswer.toState', () => {
  it('should return trimmed value', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(validPayload)
    expect(autocompleteAnswer.toState()).toBe('option1')
  })

  it('should return empty string if no value', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer()
    expect(autocompleteAnswer.toState()).toBe('')
  })

  it('should return empty string if value is undefined', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer({})
    expect(autocompleteAnswer.toState()).toBe('')
  })

  it('should trim whitespace from value', () => {
    const payload = { autocompletePayload: '  option1  ' }
    const autocompleteAnswer = new TestAutocompleteAnswer(payload)
    expect(autocompleteAnswer.toState()).toBe('option1')
  })

  it('should handle empty string after trimming', () => {
    const payload = { autocompletePayload: '   ' }
    const autocompleteAnswer = new TestAutocompleteAnswer(payload)
    expect(autocompleteAnswer.toState()).toBe('')
  })
})

describe('AutocompleteAnswer.validate', () => {
  it('should pass validation with valid data', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(validPayload)
    const { isValid, errors } = autocompleteAnswer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should fail validation with empty string', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(invalidPayload)
    const { isValid, errors } = autocompleteAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      autocompletePayload: { text: emptyError }
    })
  })

  it('should fail validation with undefined data', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer()
    const { isValid, errors } = autocompleteAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      autocompletePayload: { text: emptyError }
    })
  })

  it('should fail validation with whitespace-only string', () => {
    const payload = { autocompletePayload: '   ' }
    const autocompleteAnswer = new TestAutocompleteAnswer(payload)
    const { isValid, errors } = autocompleteAnswer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      autocompletePayload: { text: emptyError }
    })
  })

  it('should pass validation with whitespace around valid value', () => {
    const payload = { autocompletePayload: '  option1  ' }
    const autocompleteAnswer = new TestAutocompleteAnswer(payload)
    const { isValid, errors } = autocompleteAnswer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })
})

describe('AutocompleteAnswer.viewModel', () => {
  it('should return basic view model without validation', async () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(validPayload)
    const viewModel = await autocompleteAnswer.viewModel({
      validate: false,
      question
    })

    expect(viewModel).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      classes: 'autocomplete',
      id: 'autocompletePayload',
      name: 'autocompletePayload',
      value: 'option1',
      items: [
        { text: '', value: '' },
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' }
      ]
    })
  })

  it('should return view model with validation errors', async () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(invalidPayload)
    const viewModel = await autocompleteAnswer.viewModel({
      validate: true,
      question
    })

    expect(viewModel).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--l',
        isPageHeading: true
      },
      classes: 'autocomplete',
      id: 'autocompletePayload',
      name: 'autocompletePayload',
      value: '',
      items: [
        { text: '', value: '' },
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' }
      ],
      errorMessage: { text: emptyError }
    })
  })

  it('should return view model with all optional config properties', async () => {
    const autocompleteAnswer = new TestAutocompleteAnswerWithHint(validPayload)
    const viewModel = await autocompleteAnswer.viewModel({
      validate: false,
      question
    })

    expect(viewModel).toEqual({
      label: {
        text: question,
        classes: 'govuk-label--m',
        isPageHeading: false
      },
      classes: 'govuk-input--width-20',
      id: 'autocompletePayload',
      name: 'autocompletePayload',
      value: 'option1',
      hint: { text: 'Please select an option from the list' },
      items: [
        { text: '', value: '' },
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' }
      ]
    })
  })

  it('should handle undefined value in view model', async () => {
    const autocompleteAnswer = new TestAutocompleteAnswer()
    const viewModel = await autocompleteAnswer.viewModel({
      validate: false,
      question
    })

    expect(viewModel.value).toBeUndefined()
  })

  it('should use default isPageHeading value when not specified', async () => {
    const autocompleteAnswer = new TestAutocompleteAnswer(validPayload)
    const viewModel = await autocompleteAnswer.viewModel({
      validate: false,
      question
    })

    expect(viewModel.label.isPageHeading).toBe(true)
    expect(viewModel.label.classes).toBe('govuk-label--l')
  })
})

describe('AutocompleteAnswer.viewModel characterWidth', () => {
  const characterWidthConfigs = [
    { width: /** @type {2} */ (2), expected: 'govuk-input--width-2' },
    { width: /** @type {4} */ (4), expected: 'govuk-input--width-4' },
    { width: /** @type {10} */ (10), expected: 'govuk-input--width-10' },
    { width: /** @type {20} */ (20), expected: 'govuk-input--width-20' }
  ]

  characterWidthConfigs.forEach(({ width, expected }) => {
    it(`should set correct classes for characterWidth ${width}`, async () => {
      class TestCharacterWidthAnswer extends AutocompleteAnswer {
        static config = {
          ...autocompleteConfig,
          characterWidth: width
        }
      }

      const answer = new TestCharacterWidthAnswer(validPayload)
      const viewModel = await answer.viewModel({
        validate: false,
        question
      })

      expect(viewModel.classes).toBe(expected)
    })
  })
})

describe('AutocompleteAnswer._extractFields', () => {
  it('should extract only the relevant field', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer()
    const fields = {
      autocompletePayload: 'option1',
      otherField: 'other value',
      irrelevantField: 'irrelevant'
    }

    const extracted = autocompleteAnswer._extractFields(fields)
    expect(extracted).toEqual({ autocompletePayload: 'option1' })
  })

  it('should handle missing payload key', () => {
    const autocompleteAnswer = new TestAutocompleteAnswer()
    const fields = {
      otherField: 'other value'
    }

    const extracted = autocompleteAnswer._extractFields(fields)
    expect(extracted).toEqual({ autocompletePayload: undefined })
  })
})

describe('AutocompleteAnswer.fromState', () => {
  it('should create instance from valid state', () => {
    const state = 'option1'
    const autocompleteAnswer = TestAutocompleteAnswer.fromState(state)

    expect(autocompleteAnswer).toBeInstanceOf(TestAutocompleteAnswer)
    expect(autocompleteAnswer.value).toBe('option1')
    expect(autocompleteAnswer._data).toEqual({ autocompletePayload: 'option1' })
  })

  it('should create instance from undefined state', () => {
    const autocompleteAnswer = TestAutocompleteAnswer.fromState(undefined)

    expect(autocompleteAnswer).toBeInstanceOf(TestAutocompleteAnswer)
    expect(autocompleteAnswer.value).toBeUndefined()
    expect(autocompleteAnswer._data).toEqual({})
  })

  it('should create instance from empty string state', () => {
    const state = ''
    const autocompleteAnswer = TestAutocompleteAnswer.fromState(state)

    expect(autocompleteAnswer).toBeInstanceOf(TestAutocompleteAnswer)
    expect(autocompleteAnswer.value).toBe('')
    expect(autocompleteAnswer._data).toEqual({ autocompletePayload: '' })
  })
})

describe('AutocompleteAnswer async items integration', () => {
  it('should handle async items function correctly', async () => {
    let itemsCalled = false

    class AsyncItemsAnswer extends AutocompleteAnswer {
      static config = {
        ...autocompleteConfig,
        items: async () => {
          itemsCalled = true
          return Promise.resolve([
            { value: 'async1', text: 'Async Option 1' },
            { value: 'async2', text: 'Async Option 2' }
          ])
        }
      }
    }

    const answer = new AsyncItemsAnswer(validPayload)
    const viewModel = await answer.viewModel({
      validate: false,
      question
    })

    expect(itemsCalled).toBe(true)
    expect(viewModel.items).toEqual([
      { text: '', value: '' },
      { value: 'async1', text: 'Async Option 1' },
      { value: 'async2', text: 'Async Option 2' }
    ])
  })

  it('should handle items function that returns empty array', async () => {
    class EmptyItemsAnswer extends AutocompleteAnswer {
      static config = {
        ...autocompleteConfig,
        items: () => Promise.resolve([])
      }
    }

    const answer = new EmptyItemsAnswer(validPayload)
    const viewModel = await answer.viewModel({
      validate: false,
      question
    })

    expect(viewModel.items).toEqual([{ text: '', value: '' }])
  })
})

describe('AutocompleteAnswer edge cases', () => {
  it('should handle config with undefined validation.empty', () => {
    class PartialValidationAnswer extends AutocompleteAnswer {
      static config = {
        payloadKey: 'test',
        validation: {},
        items: () => Promise.resolve([])
      }
    }

    const answer = new PartialValidationAnswer({ test: '' })
    const { isValid, errors } = answer.validate()

    expect(isValid).toBe(false)
    expect(errors.test?.text).toBe('')
  })
})
