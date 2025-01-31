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

class TestRadioButtonAnswer extends RadioButtonAnswer {
  static config = testRadioConfig
}

class InlineTestRadioButtonAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    ...testRadioConfig,
    layout: 'inline'
  }
}

describe('RadioButton', () => {
  describe('RadioButton.new', () => {
    it('should strip away any irrelevant values', () => {
      const payload = { ...validTestRadio, nextPage: '/other/page' }
      const testInstance = new TestRadioButtonAnswer(payload)

      expect(testInstance._data).toEqual(validTestRadio)
    })
  })

  describe('#RadioButton.validate', () => {
    test('should return true for valid value', () => {
      const { isValid, errors } = new TestRadioButtonAnswer({
        test_radio: 'value_1'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    test('should return true for another valid value', () => {
      const { isValid, errors } = new TestRadioButtonAnswer({
        test_radio: 'value_2'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    test('should return false for empty', () => {
      const { isValid, errors } = new TestRadioButtonAnswer(
        undefined
      ).validate()

      expect(isValid).toBe(false)
      expect(errors.test_radio.text).toBe(
        testRadioConfig.errors.emptyOptionText
      )
    })

    it('should return false for an invalid', () => {
      const testInstance = new TestRadioButtonAnswer({
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
      const data = new TestRadioButtonAnswer().toState()
      expect(data).toBe('')
    })

    test('should pass through valid data unaltered', () => {
      const data = new TestRadioButtonAnswer({
        test_radio: 'value_1'
      }).toState()

      expect(data).toBe('value_1')
    })
  })

  describe('RadioButton.fromState', () => {
    it('should re-construct the payload from a valid state', () => {
      const state = new TestRadioButtonAnswer(validTestRadio).toState()
      expect(TestRadioButtonAnswer.fromState(state)._data).toEqual(
        validTestRadio
      )
    })

    it('should return an undefined value if the state is undefined', () => {
      expect(TestRadioButtonAnswer.fromState(undefined).value).toBeUndefined()
    })

    it('should store undefined if the state is undefined', () => {
      expect(TestRadioButtonAnswer.fromState(undefined)._data).toBeUndefined()
    })
  })

  describe('#RadioButton.value', () => {
    it('should return a value-wrapped object to rendering in the template', () => {
      expect(new TestRadioButtonAnswer({ test_radio: 'value_1' }).value).toBe(
        'value_1'
      )
    })
  })

  describe('#RadioButton.html', () => {
    it('should return the full text for `value_1`', () => {
      expect(new TestRadioButtonAnswer({ test_radio: 'value_1' }).html).toBe(
        'test_label_1'
      )
    })

    it('should return the full text for `value_2`', () => {
      expect(new TestRadioButtonAnswer({ test_radio: 'value_2' }).html).toBe(
        'test_label_2'
      )
    })

    it('should return an empty string for undefined', () => {
      expect(new TestRadioButtonAnswer(undefined).html).toBe('')
    })
  })

  describe('#RadioButton.viewModel', () => {
    const question = 'What option would you like to pick?'

    const invalidAnswer = new TestRadioButtonAnswer({
      test_radio: 'invalid_answer'
    })
    const defaultViewModel = {
      fieldset: {
        legend: {
          text: question,
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      name: 'test_radio',
      id: 'test_radio',
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
      expect(invalidAnswer.viewModel({ validate: false, question })).toEqual(
        defaultViewModel
      )
    })

    it('should return everything (including errors) to render in the template', () => {
      expect(invalidAnswer.viewModel({ validate: true, question })).toEqual({
        ...defaultViewModel,
        errorMessage: { text: 'Select an option' }
      })
    })

    describe('radio button layout', () => {
      it('should return inline class when layout is inline', () => {
        const answer = new InlineTestRadioButtonAnswer({
          test_radio: 'value_1'
        })
        expect(answer.viewModel({ validate: false, question })).toMatchObject({
          classes: 'govuk-radios--inline'
        })
      })

      it('should return empty class when layout is not specified', () => {
        const answer = new TestRadioButtonAnswer({ test_radio: 'value_1' })
        expect(answer.viewModel({ validate: false, question })).toMatchObject({
          classes: ''
        })
      })
    })
  })
})
