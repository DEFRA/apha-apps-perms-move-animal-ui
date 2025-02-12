import { CheckboxAnswer } from './checkbox.js'

/** @import {CheckboxConfig} from './checkbox.js' */

const checkboxEmptyError = 'Select at least one checkbox'

/** @type {CheckboxConfig} */
const config = {
  payloadKey: 'test_checkbox',
  options: {
    badgerProofFencing: {
      label:
        'Badger proof fencing, such as solid aluminium sheeted gates, aluminium sheeting on rail fences, retractable electric fences'
    },
    limitAccessToBadgerHabitat: {
      label: 'Limiting access to badger latrines and setts'
    }
  },
  validation: {
    empty: { message: checkboxEmptyError }
  }
}

class TestCheckboxAnswer extends CheckboxAnswer {
  static config = config
}

class TestCheckboxAnswerAllOptional extends CheckboxAnswer {
  static config = { ...config, validation: {} }
}

const validTestCheckbox = { test_checkbox: ['badgerProofFencing'] }

describe('Checkbox.new', () => {
  it('should strip away any irrelevant values', () => {
    const payload = { ...validTestCheckbox, nextPage: '/other/page' }
    const testInstance = new TestCheckboxAnswer(payload)

    expect(testInstance._data).toEqual(validTestCheckbox)
  })
})

describe('#Checkbox.validate', () => {
  it('should return true for valid value (passed in as a single answer)', () => {
    const { isValid, errors } = new TestCheckboxAnswer({
      test_checkbox: 'badgerProofFencing'
    }).validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should return true for valid value (passed in as an array)', () => {
    const { isValid, errors } = new TestCheckboxAnswer({
      test_checkbox: ['badgerProofFencing']
    }).validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should return true for another valid value', () => {
    const { isValid, errors } = new TestCheckboxAnswer({
      test_checkbox: 'limitAccessToBadgerHabitat'
    }).validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should return true for an array of valid values', () => {
    const { isValid, errors } = new TestCheckboxAnswer({
      test_checkbox: ['badgerProofFencing', 'limitAccessToBadgerHabitat']
    }).validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should return false for empty', () => {
    const { isValid, errors } = new TestCheckboxAnswer(undefined).validate()

    expect(isValid).toBe(false)
    expect(errors.test_checkbox.text).toBe(checkboxEmptyError)
  })

  it('should return false for invalid values, even if mixed with valid values', () => {
    const { isValid } = new TestCheckboxAnswer({
      test_checkbox: ['notAValue', 'badgerProofFencing']
    }).validate()

    expect(isValid).toBe(false)
    // no mandated error message here, because this should only be hit if user
    // manually constructs a POST payload
  })

  describe('TestCheckboxAnswerAllOptional', () => {
    it('should not error if no options are selected', () => {
      const { isValid } = new TestCheckboxAnswerAllOptional(
        undefined
      ).validate()

      expect(isValid).toBe(true)
    })
  })
})

describe('#Checkbox.toState', () => {
  it('should return an object with the correct data', () => {
    const checkbox = new TestCheckboxAnswer({
      test_checkbox: ['badgerProofFencing']
    })
    expect(checkbox.toState()).toEqual(['badgerProofFencing'])
  })

  it('should normalise a single option into an array', () => {
    const checkbox = new TestCheckboxAnswer({
      test_checkbox: 'badgerProofFencing'
    })
    expect(checkbox.toState()).toEqual(['badgerProofFencing'])
  })

  it('should return an object with the correct data (with more than one selected)', () => {
    const confirmation = new TestCheckboxAnswer({
      test_checkbox: ['badgerProofFencing', 'limitAccessToBadgerHabitat']
    })
    expect(confirmation.toState()).toEqual([
      'badgerProofFencing',
      'limitAccessToBadgerHabitat'
    ])
  })
})

describe('Checkbox.fromState', () => {
  it('should re-construct the payload from a valid state', () => {
    const state = new TestCheckboxAnswer(validTestCheckbox).toState()
    expect(TestCheckboxAnswer.fromState(state)._data).toEqual(validTestCheckbox)
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(TestCheckboxAnswer.fromState(undefined)._data).toBeUndefined()
  })
})

describe('Checkbox.value', () => {
  it('should return a value-wrapped object to rendering in the template', () => {
    expect(
      new TestCheckboxAnswer({ test_checkbox: ['badgerProofFencing'] }).value
    ).toEqual(['badgerProofFencing'])
  })

  it('should return undefined if the payload is undefined', () => {
    expect(new TestCheckboxAnswer(undefined).value).toBeUndefined()
  })

  it('should return an array-wrapped payload, even if the initial value is a string', () => {
    expect(
      new TestCheckboxAnswer({ test_checkbox: 'badgerProofFencing' }).value
    ).toEqual(['badgerProofFencing'])
  })
})

describe('CheckboxAnswer.template', () => {
  it('should return the radio button model template', () => {
    const radio = new TestCheckboxAnswer(validTestCheckbox)
    expect(radio.template).toBe('model/answer/checkbox/checkbox.njk')
  })
})

describe('CheckboxAnswer.viewModel', () => {
  const question =
    'Which measures are you taking to reduce contamination from wildlife?'

  const defaultViewModel = {
    name: 'test_checkbox',
    id: 'test_checkbox',
    fieldset: {
      legend: {
        text: question,
        isPageHeading: false
      }
    }
  }

  it('should return everything (except errors) to render in the template', () => {
    const validAnswer = new TestCheckboxAnswer({
      test_checkbox: ['limitAccessToBadgerHabitat']
    })

    expect(validAnswer.viewModel({ validate: false, question })).toEqual({
      ...defaultViewModel,
      items: [
        {
          value: 'badgerProofFencing',
          text: TestCheckboxAnswer.config.options.badgerProofFencing,
          attributes: {
            'data-testid': 'badgerProofFencing-checkbox'
          },
          checked: false
        },
        {
          value: 'limitAccessToBadgerHabitat',
          text: TestCheckboxAnswer.config.options.limitAccessToBadgerHabitat,
          attributes: {
            'data-testid': 'limitAccessToBadgerHabitat-checkbox'
          },
          checked: true
        }
      ]
    })
  })

  it('should return everything (including errors) to render in the template', () => {
    const invalidAnswer = new TestCheckboxAnswer({
      test_checkbox: []
    })

    expect(invalidAnswer.viewModel({ validate: true, question })).toEqual({
      ...defaultViewModel,
      errorMessage: { text: checkboxEmptyError },
      items: [
        {
          value: 'badgerProofFencing',
          text: TestCheckboxAnswer.config.options.badgerProofFencing,
          attributes: {
            'data-testid': 'badgerProofFencing-checkbox'
          },
          checked: false
        },
        {
          value: 'limitAccessToBadgerHabitat',
          text: TestCheckboxAnswer.config.options.limitAccessToBadgerHabitat,
          attributes: {
            'data-testid': 'limitAccessToBadgerHabitat-checkbox'
          },
          checked: false
        }
      ]
    })
  })
})
