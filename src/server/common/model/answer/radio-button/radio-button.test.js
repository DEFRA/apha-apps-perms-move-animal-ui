import { RadioButtonAnswer } from './radio-button.js'

/** @import {RadioButtonConfig} from './radio-button.js' */

/**
 * @typedef {'value_1' | 'value_2'} TestRadioValues
 * @typedef {{ test_radio: TestRadioValues }} TestRadioPayload
 */

/** @type {TestRadioPayload} */
const validTestRadio = {
  test_radio: 'value_1'
}

/** @type {RadioButtonConfig} */
const testRadioConfig = {
  payloadKey: 'test_radio',
  options: {
    value_1: { label: 'test_label_1' },
    value_2: { label: 'test_label_2', hint: 'test_hint_2' }
  },
  errors: {
    emptyOptionText: 'Select an option'
  }
}

class RadioButtonTest extends RadioButtonAnswer {
  get config() {
    return testRadioConfig
  }

  static get config() {
    return testRadioConfig
  }
}

describe('RadioButton', () => {
  describe('RadioButton.new', () => {
    it('should strip away any irrelevant values', () => {
      const payload = { ...validTestRadio, nextPage: '/other/page' }
      const testInstance = new RadioButtonTest(payload)

      expect(testInstance._data).toEqual(validTestRadio)
    })
  })

  describe('#RadioButton.validate', () => {
    test('should return true for valid value', () => {
      const { isValid, errors } = new RadioButtonTest({
        test_radio: 'value_1'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    test('should return true for another valid value', () => {
      const { isValid, errors } = new RadioButtonTest({
        test_radio: 'value_2'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    test('should return false for empty', () => {
      const { isValid, errors } = new RadioButtonTest(undefined).validate()

      expect(isValid).toBe(false)
      expect(errors.test_radio.text).toBe(
        testRadioConfig.errors.emptyOptionText
      )
    })

    it('should return false for an invalid', () => {
      const testInstance = new RadioButtonTest({
        test_radio: 'invalid value'
      })

      const { isValid, errors } = testInstance.validate()

      expect(isValid).toBe(false)
      expect(errors.test_radio.text).toBe(
        testRadioConfig.errors.emptyOptionText
      )
    })
  })

  describe('#RadioButton.toState', () => {
    test('should replace missing data with blank string', () => {
      const data = new RadioButtonTest().toState()
      expect(data).toBe('')
    })

    test('should pass through valid data unaltered', () => {
      const data = new RadioButtonTest({ test_radio: 'value_1' }).toState()

      expect(data).toBe('value_1')
    })
  })

  describe('RadioButton.fromState', () => {
    it('should re-construct the payload from a valid state', () => {
      const state = new RadioButtonTest(validTestRadio).toState()
      expect(RadioButtonTest.fromState(state)._data).toEqual(validTestRadio)
    })

    it('should return an undefined value if the state is undefined', () => {
      expect(RadioButtonTest.fromState(undefined).value).toBeUndefined()
    })

    it('should store undefined if the state is undefined', () => {
      expect(RadioButtonTest.fromState(undefined)._data).toBeUndefined()
    })
  })

  describe('#RadioButton.value', () => {
    it('should return a value-wrapped object to rendering in the template', () => {
      expect(new RadioButtonTest({ test_radio: 'value_1' }).value).toBe(
        'value_1'
      )
    })
  })

  describe('#RadioButton.html', () => {
    it('should return the full text for `value_1`', () => {
      expect(new RadioButtonTest({ test_radio: 'value_1' }).html).toBe(
        'test_label_1'
      )
    })

    it('should return the full text for `value_2`', () => {
      expect(new RadioButtonTest({ test_radio: 'value_2' }).html).toBe(
        'test_label_2'
      )
    })

    it('should return an empty string for undefined', () => {
      expect(new RadioButtonTest(undefined).html).toBe('')
    })
  })

  describe('#RadioButton.viewModel', () => {
    const invalidAnswer = new RadioButtonTest({ test_radio: 'invalid_answer' })
    const defaultViewModel = {
      name: 'test_radio',
      id: 'test_radio',
      fieldset: {},
      value: invalidAnswer.value,
      classes: '',
      items: [
        {
          id: 'test_radio',
          value: 'value_1',
          text: 'test_label_1',
          hint: {
            text: undefined
          }
        },
        {
          id: 'value_2',
          value: 'value_2',
          text: 'test_label_2',
          hint: {
            text: 'test_hint_2'
          }
        }
      ]
    }

    it('should return everything (except errors) to render in the template', () => {
      expect(invalidAnswer.viewModel({ validate: false })).toEqual(
        defaultViewModel
      )
    })

    it('should return everything (including errors) to render in the template', () => {
      expect(invalidAnswer.viewModel({ validate: true })).toEqual({
        ...defaultViewModel,
        errorMessage: { text: 'Select an option' }
      })
    })

    describe('radio button layout', () => {
      const originalLayout = testRadioConfig.layout

      afterEach(() => {
        testRadioConfig.layout = originalLayout
      })

      it('should return inline class when layout is inline', () => {
        testRadioConfig.layout = 'inline'
        const answer = new RadioButtonTest({ test_radio: 'value_1' })
        expect(answer.viewModel({ validate: false })).toMatchObject({
          classes: 'govuk-radios--inline'
        })
      })

      it('should return empty class when layout is not specified', () => {
        const answer = new RadioButtonTest({ test_radio: 'value_1' })
        expect(answer.viewModel({ validate: false })).toMatchObject({
          classes: ''
        })
      })
    })
  })
})
