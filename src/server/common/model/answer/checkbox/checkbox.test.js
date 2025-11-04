import { CheckboxAnswer } from './checkbox.js'

/** @import {CheckboxConfig} from './checkbox.js' */

const checkboxEmptyError = 'Select at least one checkbox'

/** @type {CheckboxConfig} */
const config = {
  payloadKey: 'test_checkbox',
  hint: 'test_hint',
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
    const { isValid, errors } = new TestCheckboxAnswer({
      test_checkbox: []
    }).validate()

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
    it('should not error if no options are selected (before converting to array in toState)', () => {
      const { isValid } = new TestCheckboxAnswerAllOptional({
        test_checkbox: undefined
      }).validate()

      expect(isValid).toBe(true)
    })

    it('should not error if no options are selected (after converting to array in toState)', () => {
      const { isValid } = new TestCheckboxAnswerAllOptional({
        test_checkbox: []
      }).validate()

      expect(isValid).toBe(true)
    })

    it('should error if the question has not yet been answered', () => {
      const { isValid } = new TestCheckboxAnswerAllOptional(
        undefined
      ).validate()

      expect(isValid).toBe(false)
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

describe('CheckboxAnswer.html', () => {
  it('should return the payload with HTML', () => {
    const checkbox = new TestCheckboxAnswer({
      test_checkbox: ['badgerProofFencing', 'limitAccessToBadgerHabitat']
    })

    expect(checkbox.html).toMatchSnapshot()
  })

  it('should return None for undefined state', () => {
    const checkbox = new TestCheckboxAnswer(undefined)
    expect(checkbox.html).toBe('None')
  })

  it('should return None for an empty list', () => {
    const checkbox = new TestCheckboxAnswer({
      test_checkbox: []
    })
    expect(checkbox.html).toBe('None')
  })
})

describe('CheckboxAnswer.viewModel', () => {
  const question =
    'Which measures are you taking to reduce contamination from wildlife?'

  const defaultViewModel = {
    name: 'test_checkbox',
    id: 'test_checkbox',
    hint: {
      text: 'test_hint'
    },
    fieldset: {
      legend: {
        text: question,
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    }
  }

  const itemOne = {
    value: 'badgerProofFencing',
    text: TestCheckboxAnswer.config.options.badgerProofFencing.label,
    attributes: {
      'data-testid': 'badgerProofFencing-checkbox'
    },
    checked: false
  }

  const itemTwo = {
    value: 'limitAccessToBadgerHabitat',
    text: TestCheckboxAnswer.config.options.limitAccessToBadgerHabitat.label,
    attributes: {
      'data-testid': 'limitAccessToBadgerHabitat-checkbox'
    },
    checked: false
  }

  it('should return everything (except errors) to render in the template', async () => {
    const validAnswer = new TestCheckboxAnswer({
      test_checkbox: ['limitAccessToBadgerHabitat']
    })

    const expectedItems = [itemOne, { ...itemTwo, checked: true }]

    expect(await validAnswer.viewModel({ validate: false, question })).toEqual({
      ...defaultViewModel,
      items: expectedItems
    })
  })

  it('should return everything (including errors) to render in the template', async () => {
    const invalidAnswer = new TestCheckboxAnswer({
      test_checkbox: []
    })

    const expectedItems = [itemOne, itemTwo]

    expect(await invalidAnswer.viewModel({ validate: true, question })).toEqual(
      {
        ...defaultViewModel,
        errorMessage: { text: checkboxEmptyError },
        items: expectedItems
      }
    )
  })

  it('should return data to render with the alternative (not page heading) question styles set correctly', async () => {
    /** @type {CheckboxConfig} */
    const checkboxConfigNotPageHeading = {
      ...config,
      isPageHeading: false
    }

    class NonPageHeadingCheckboxAnswer extends CheckboxAnswer {
      static config = checkboxConfigNotPageHeading
    }
    const nonPageHeadingAnswer = new NonPageHeadingCheckboxAnswer({
      test_checkbox: ['limitAccessToBadgerHabitat']
    })

    const expectedItems = [itemOne, { ...itemTwo, checked: true }]

    expect(
      await nonPageHeadingAnswer.viewModel({ validate: false, question })
    ).toEqual({
      ...defaultViewModel,

      fieldset: {
        legend: {
          ...defaultViewModel.fieldset.legend,

          classes: '',
          isPageHeading: false
        }
      },
      items: expectedItems
    })
  })
})

describe('CheckboxAnswer - dividers and exclusive options', () => {
  const configWithDividerAndExclusive = {
    payloadKey: 'test_checkbox',
    options: {
      option1: { label: 'Option 1' },
      divider: { label: 'Divider label' },
      option2: { label: 'Option 2', exclusive: true }
    },
    validation: {
      exclusive: {
        message: 'You cannot select {{#label}} with other options'
      }
    }
  }

  class DividerExclusiveCheckboxAnswer extends CheckboxAnswer {
    static config = configWithDividerAndExclusive
  }

  it('should include a divider item in the viewModel', async () => {
    const answer = new DividerExclusiveCheckboxAnswer({ test_checkbox: [] })
    const viewModel = await answer.viewModel({
      question: 'Test',
      validate: false
    })
    expect(viewModel.items).toEqual([
      {
        text: 'Option 1',
        value: 'option1',
        attributes: { 'data-testid': 'option1-checkbox' },
        checked: false
      },
      {
        divider: 'Divider label'
      },
      {
        text: 'Option 2',
        value: 'option2',
        attributes: { 'data-testid': 'option2-checkbox' },
        checked: false,
        behaviour: 'exclusive'
      }
    ])
  })

  it('should mark exclusive options with behaviour: "exclusive"', async () => {
    const answer = new DividerExclusiveCheckboxAnswer({
      test_checkbox: ['option2']
    })
    const viewModel = await answer.viewModel({
      question: 'Test',
      validate: false
    })
    const exclusiveItem = viewModel.items.find(
      (item) => 'value' in item && item.value === 'option2'
    )
    expect(exclusiveItem).toMatchObject({
      behaviour: 'exclusive',
      checked: true
    })
  })

  describe('Exclusive option validation', () => {
    it('should validate when only an exclusive option is selected', () => {
      const answer = new DividerExclusiveCheckboxAnswer({
        test_checkbox: ['option2']
      })
      const { isValid, errors } = answer.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should validate when only non-exclusive options are selected', () => {
      const answer = new DividerExclusiveCheckboxAnswer({
        test_checkbox: ['option1']
      })
      const { isValid, errors } = answer.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should fail validation when exclusive option is selected with other options', () => {
      const answer = new DividerExclusiveCheckboxAnswer({
        test_checkbox: ['option1', 'option2']
      })
      const { isValid, errors } = answer.validate()

      expect(isValid).toBe(false)
      expect(errors).toMatchObject({
        test_checkbox: {
          text: 'You cannot select "test_checkbox" with other options'
        }
      })
    })

    it('should fail validation when multiple exclusive options are selected', () => {
      const configWithMultipleExclusives = {
        payloadKey: 'test_checkbox',
        options: {
          option1: { label: 'Option 1' },
          option2: { label: 'Option 2', exclusive: true },
          option3: { label: 'Option 3', exclusive: true }
        },
        validation: {
          multipleExclusive: {
            message: 'You cannot select multiple exclusive options'
          }
        }
      }

      class MultipleExclusiveCheckboxAnswer extends CheckboxAnswer {
        static config = configWithMultipleExclusives
      }

      const answer = new MultipleExclusiveCheckboxAnswer({
        test_checkbox: ['option2', 'option3']
      })
      const { isValid, errors } = answer.validate()

      expect(isValid).toBe(false)
      expect(errors).toMatchObject({
        test_checkbox: {
          text: 'You cannot select multiple exclusive options'
        }
      })
    })
  })
})
