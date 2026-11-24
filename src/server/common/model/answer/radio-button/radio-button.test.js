import { fallbackTranslate } from '../../../test-helpers/translate.js'
import { RadioButtonAnswer } from './radio-button.js'

/** @import {RadioButtonConfig} from './radio-button.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/**
 * @typedef {'value_1' | 'value_2'} TestRadioValues
 * @typedef {{ test_radio: TestRadioValues }} TestRadioPayload
 */

/** @type {TestRadioPayload} */
const validTestRadio = {
  test_radio: 'value_1'
}

/** @type {RawApplicationState} */
const applicationState = { origin: { onOffFarm: 'on' } }

/** @type {RadioButtonConfig} */
const defaultConfig = {
  payloadKey: 'test_radio',
  hint: 'main_hint',
  options: {
    value_1: { label: 'test_label_1' },
    value_2: { label: 'test_label_2', hint: 'test_hint_2' }
  },
  validation: {
    empty: 'Select an option'
  }
}

const onFarmOptions = {
  value_1: { label: 'test_label_1' },
  value_2: { label: 'test_label_2', hint: 'test_hint_2' },
  value_3: {
    label: 'test_label_3',
    hint: 'test_hint_3'
  }
}

/**
 * @param {RawApplicationState} app
 * @returns {RadioButtonConfig}
 */
const testRadioConfig = (app) => {
  if (app.origin?.onOffFarm === 'on') {
    return { ...defaultConfig, options: onFarmOptions }
  } else {
    return defaultConfig
  }
}

class TestRadioButtonAnswer extends RadioButtonAnswer {
  static config = testRadioConfig
}

class InlineTestRadioButtonAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    ...defaultConfig,
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
      expect(errors.test_radio.text).toBe(testRadioConfig({}).validation.empty)
    })

    it('should return false for an invalid', () => {
      const testInstance = new TestRadioButtonAnswer({
        test_radio: 'invalid value'
      })

      const { isValid, errors } = testInstance.validate()

      expect(isValid).toBe(false)
      expect(errors.test_radio.text).toBe(testRadioConfig({}).validation.empty)
    })

    it('should return false for values that would be valid, but whose predicates fail', () => {
      const testInstance = new TestRadioButtonAnswer({
        test_radio: 'value_3'
      })

      const { isValid, errors } = testInstance.validate()

      expect(isValid).toBe(false)
      expect(errors.test_radio.text).toBe(testRadioConfig({}).validation.empty)
    })

    it('should return true or values that are only valid because their predicates pass', () => {
      const testInstance = new TestRadioButtonAnswer(
        {
          test_radio: 'value_3'
        },
        applicationState
      )

      const { isValid, errors } = testInstance.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
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
      expect(
        TestRadioButtonAnswer.fromState(undefined)._context
      ).toBeUndefined()
    })

    it('should store payload and context if passed', () => {
      const state = validTestRadio.test_radio

      const answer = TestRadioButtonAnswer.fromState(state, applicationState)

      expect(answer._data).toEqual(validTestRadio)
      expect(answer._context).toEqual(applicationState)
    })
  })

  describe('#RadioButton.value', () => {
    it('should return a value-wrapped object to rendering in the template', () => {
      expect(new TestRadioButtonAnswer({ test_radio: 'value_1' }).value).toBe(
        'value_1'
      )
    })
  })

  describe('#RadioButton.displayText', () => {
    it('should return the full text for `value_1`', () => {
      expect(
        new TestRadioButtonAnswer({ test_radio: 'value_1' }).displayText
      ).toBe('test_label_1')
    })

    it('should return the full text for `value_2`', () => {
      expect(
        new TestRadioButtonAnswer({ test_radio: 'value_2' }).displayText
      ).toBe('test_label_2')
    })

    it('should return an empty string for undefined', () => {
      expect(new TestRadioButtonAnswer(undefined).displayText).toBe('')
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
      ],
      hint: {
        text: 'main_hint'
      }
    }

    it('should translate the main hint and option labels and hints', async () => {
      class TranslatedRadioAnswer extends RadioButtonAnswer {
        static config = {
          ...defaultConfig,
          hintI18nKey: 'test.radio.hint',
          options: {
            value_1: {
              label: 'First option',
              labelI18nKey: 'test.radio.first'
            },
            value_2: {
              label: 'Second option',
              labelI18nKey: 'test.radio.second',
              hint: 'Second hint',
              hintI18nKey: 'test.radio.secondHint'
            }
          }
        }
      }
      const translations = {
        'test.radio.hint': 'Translated main hint',
        'test.radio.first': 'Translated first option',
        'test.radio.second': 'Translated second option',
        'test.radio.secondHint': 'Translated second hint'
      }
      const translate = jest.fn(
        (key, fallback) => translations[key] ?? fallback
      )
      const answer = new TranslatedRadioAnswer(validTestRadio)
      const viewModel = await answer.viewModel({ question, translate })

      expect(viewModel.hint.text).toBe('Translated main hint')
      expect(viewModel.items.map((item) => item.text)).toEqual([
        'Translated first option',
        'Translated second option'
      ])
      expect(viewModel.items[0].hint.text).toBeUndefined()
      expect(viewModel.items[1].hint.text).toBe('Translated second hint')
      expect(translate).toHaveBeenCalledWith('test.radio.hint', 'main_hint')
      expect(translate).toHaveBeenCalledWith('test.radio.first', 'First option')
      expect(translate).toHaveBeenCalledWith(
        'test.radio.second',
        'Second option'
      )
      expect(translate).toHaveBeenCalledWith(
        'test.radio.secondHint',
        'Second hint'
      )
    })

    it('should use hint and option fallbacks when no keys are configured', async () => {
      const translate = jest.fn((_key, fallback) => fallback)
      const viewModel = await invalidAnswer.viewModel({ question, translate })

      expect(viewModel.hint.text).toBe('main_hint')
      expect(viewModel.items.map((item) => item.text)).toEqual([
        'test_label_1',
        'test_label_2'
      ])
      expect(viewModel.items[1].hint.text).toBe('test_hint_2')
      expect(translate).toHaveBeenCalledWith(undefined, 'main_hint')
      expect(translate).toHaveBeenCalledWith(undefined, 'test_label_1')
      expect(translate).toHaveBeenCalledWith(undefined, 'test_label_2')
      expect(translate).toHaveBeenCalledWith(undefined, 'test_hint_2')
    })

    it('should return everything (except errors) to render in the template', async () => {
      expect(
        await invalidAnswer.viewModel({
          translate: fallbackTranslate,
          validate: false,
          question
        })
      ).toEqual(defaultViewModel)
    })

    it('should return everything (including errors) to render in the template', async () => {
      expect(
        await invalidAnswer.viewModel({
          translate: fallbackTranslate,
          validate: true,
          question
        })
      ).toEqual({
        ...defaultViewModel,
        errorMessage: { text: 'Select an option' }
      })
    })

    it('should not return extra options if the predicate is not met', async () => {
      const applicationState = {
        origin: { onOffFarm: 'off' }
      }
      const invalidAnswer = new TestRadioButtonAnswer(
        {
          test_radio: 'invalid_answer'
        },
        applicationState
      )

      expect(
        await invalidAnswer.viewModel({
          translate: fallbackTranslate,
          validate: false,
          question
        })
      ).toEqual(defaultViewModel)
    })

    it('should return extra options if the predicate is met', async () => {
      const invalidAnswer = new TestRadioButtonAnswer(
        {
          test_radio: 'invalid_answer'
        },
        applicationState
      )

      expect(
        await invalidAnswer.viewModel({
          translate: fallbackTranslate,
          validate: false,
          question
        })
      ).toEqual({
        ...defaultViewModel,
        items: defaultViewModel.items.concat([
          {
            id: 'value_3',
            value: 'value_3',
            text: 'test_label_3',
            hint: {
              text: 'test_hint_3'
            }
          }
        ])
      })
    })

    describe('radio button layout', () => {
      it('should return inline class when layout is inline', async () => {
        const answer = new InlineTestRadioButtonAnswer({
          test_radio: 'value_1'
        })
        expect(
          await answer.viewModel({
            translate: fallbackTranslate,
            validate: false,
            question
          })
        ).toMatchObject({
          classes: 'govuk-radios--inline'
        })
      })

      it('should return empty class when layout is not specified', async () => {
        const answer = new TestRadioButtonAnswer({ test_radio: 'value_1' })
        expect(
          await answer.viewModel({
            translate: fallbackTranslate,
            validate: false,
            question
          })
        ).toMatchObject({
          classes: ''
        })
      })
    })
  })
})

describe('RadioButtonAnswer.template', () => {
  it('should return the radio button model template', () => {
    const radio = new TestRadioButtonAnswer(validTestRadio)
    expect(radio.template).toBe('model/answer/radio-button/radio-button.njk')
  })
})

describe('RadioButtonAnswer.context', () => {
  it('should filter out config options where they do not meet the current preciates', () => {
    const radio = new TestRadioButtonAnswer(validTestRadio)
    expect(radio.config.options).toEqual({
      value_1: { label: 'test_label_1' },
      value_2: { label: 'test_label_2', hint: 'test_hint_2' }
    })
  })

  it('should include config options where predicate matches', () => {
    const radio = new TestRadioButtonAnswer(validTestRadio, applicationState)
    expect(radio.config.options).toEqual(onFarmOptions)
  })
})
