import { addDays, subDays } from 'date-fns'
import { DateAnswer } from './date.js'
/**
 * @import { DateConfig } from './date.js'
 * @import { DateData } from './date-utils.js'
 */

const question = 'Enter your answer?'
const hint = 'For example, 27 3 2007'

/** @type {DateConfig} */
const dateConfig = {
  hint,
  validation: {
    missingDate: { message: 'Enter a date' },
    missingDay: { message: 'Enter a day' },
    missingMonth: { message: 'Enter a month' },
    missingYear: { message: 'Enter a year' },
    invalidDay: { message: 'Enter a valid day' },
    invalidMonth: { message: 'Enter a valid month' },
    invalidYear: { message: 'Enter a valid year' },
    invalidDate: { message: 'Enter a date that is in the gregorian calendar' },
    nonFourDigitYear: { message: 'Year must have 4 numbers' },
    futureDate: { message: 'Date must be in the past' }
  }
}

class TestDateAnswer extends DateAnswer {
  static config = dateConfig
}

const validPayload = { day: '12', month: '12', year: '2024' }
const invalidPayload = { day: 'aa', month: 'March', year: '20' }

describe('DateAnswer.new', () => {
  it('should strip away any irrelevant values', () => {
    const payload = { ...validPayload, nextPage: '/other/page' }
    const textAnswer = new TestDateAnswer(payload)

    expect(textAnswer._data).toEqual(validPayload)
  })
})

describe('DateAnswer.validate (missing day, month or year)', () => {
  it('should return true for a valid date', () => {
    const answer = new TestDateAnswer(validPayload)
    const { isValid, errors } = answer.validate()
    expect(isValid).toBe(true)
    expect(errors).toStrictEqual({})
  })

  it('should error if the input is undefined', () => {
    const answer = new TestDateAnswer(undefined)
    const { isValid, errors, subfields } = answer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      'date-day': { text: dateConfig.validation.missingDate.message }
    })
    expect(subfields).toEqual(['day', 'month', 'year'])
  })

  it('should return missing date if none of the data is present', () => {
    const answer = new TestDateAnswer(undefined)
    const { isValid, errors, subfields } = answer.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      'date-day': { text: dateConfig.validation.missingDate.message }
    })
    expect(subfields).toEqual(['day', 'month', 'year'])
  })

  it('should return missing day if other fields are present but day is missing', () => {
    const answer = new TestDateAnswer({ day: '', month: '12', year: '2024' })

    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.missingDay.message }
    })
    expect(subfields).toEqual(['day'])
  })

  it('should return missing month if other fields are present but month is missing', () => {
    const answer = new TestDateAnswer({ day: '12', month: '', year: '2024' })

    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-month': { text: dateConfig.validation.missingMonth.message }
    })
    expect(subfields).toEqual(['month'])
  })

  it('should return missing year if other fields are present but year is missing', () => {
    const answer = new TestDateAnswer({ day: '12', month: '12', year: '' })

    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-year': { text: dateConfig.validation.missingYear.message }
    })
    expect(subfields).toEqual(['year'])
  })

  it('should give preference to day over month', () => {
    const answer = new TestDateAnswer({ day: '', month: '', year: '2024' })
    expect(answer.validate().subfields).toEqual(['day'])
  })

  it('should give preference to day over year', () => {
    const answer = new TestDateAnswer({ day: '', month: '12', year: '' })
    expect(answer.validate().subfields).toEqual(['day'])
  })

  it('should give preference to month over year', () => {
    const answer = new TestDateAnswer({ day: '12', month: '', year: '' })
    expect(answer.validate().subfields).toEqual(['month'])
  })
})

describe('DateAnswer.validate (invalid day, month or year)', () => {
  it('should accept valid day, month and year', () => {
    const answer = new TestDateAnswer({ day: '1', month: '12', year: '2024' })
    expect(answer.validate().isValid).toBe(true)
  })

  it('should accept valid day, month and year (even with whitespace)', () => {
    const answer = new TestDateAnswer({
      day: '  1  ',
      month: ' 12 ',
      year: '  2024   '
    })
    expect(answer.validate().isValid).toBe(true)
  })

  it('should accept valid day & month (even a single 0 prefix for single-digit days)', () => {
    const answer = new TestDateAnswer({
      day: '01',
      month: '02',
      year: '2024'
    })
    expect(answer.validate().isValid).toBe(true)
  })

  it('should reject a day higher than 31', () => {
    const answer = new TestDateAnswer({ day: '32', month: '12', year: '2024' })

    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.invalidDay.message }
    })
    expect(subfields).toEqual(['day'])
  })

  it('should reject a day lower than 1', () => {
    const answer = new TestDateAnswer({ day: '0', month: '12', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.invalidDay.message }
    })
    expect(subfields).toEqual(['day'])
  })

  it('should reject a non-numeric day', () => {
    const answer = new TestDateAnswer({
      day: 'first',
      month: '12',
      year: '2024'
    })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.invalidDay.message }
    })
    expect(subfields).toEqual(['day'])
  })

  it('should reject a day with double-digits and a zero prefix', () => {
    const answer = new TestDateAnswer({ day: '012', month: '12', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.invalidDay.message }
    })
    expect(subfields).toEqual(['day'])
  })

  it('should reject a day with more than one zero prefix', () => {
    const answer = new TestDateAnswer({ day: '002', month: '12', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.invalidDay.message }
    })
    expect(subfields).toEqual(['day'])
  })

  it('should reject a day two zeros alone', () => {
    const answer = new TestDateAnswer({ day: '00', month: '12', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.invalidDay.message }
    })
    expect(subfields).toEqual(['day'])
  })

  it('should reject a non-numeric month', () => {
    const answer = new TestDateAnswer({
      day: '12',
      month: 'March',
      year: '2024'
    })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-month': { text: dateConfig.validation.invalidMonth.message }
    })
    expect(subfields).toEqual(['month'])
  })

  it('should reject a month less than 1', () => {
    const answer = new TestDateAnswer({ day: '12', month: '0', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-month': { text: dateConfig.validation.invalidMonth.message }
    })
    expect(subfields).toEqual(['month'])
  })

  it('should reject a month more than 12', () => {
    const answer = new TestDateAnswer({ day: '12', month: '13', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-month': { text: dateConfig.validation.invalidMonth.message }
    })
    expect(subfields).toEqual(['month'])
  })

  it('should reject a month with double-digits and a zero prefix', () => {
    const answer = new TestDateAnswer({ day: '12', month: '012', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-month': { text: dateConfig.validation.invalidMonth.message }
    })
    expect(subfields).toEqual(['month'])
  })

  it('should reject a month with more than one zero prefix', () => {
    const answer = new TestDateAnswer({ day: '12', month: '003', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-month': { text: dateConfig.validation.invalidMonth.message }
    })
    expect(subfields).toEqual(['month'])
  })

  it('should reject a month with two zeros alone', () => {
    const answer = new TestDateAnswer({ day: '12', month: '00', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-month': { text: dateConfig.validation.invalidMonth.message }
    })
    expect(subfields).toEqual(['month'])
  })

  it('should reject a non-numeric year', () => {
    const answer = new TestDateAnswer({
      day: '12',
      month: '12',
      year: 'nineteen ninety nine'
    })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-year': { text: dateConfig.validation.invalidYear.message }
    })
    expect(subfields).toEqual(['year'])
  })

  it("should reject a year that doesn't match the regex", () => {
    const answer = new TestDateAnswer({ day: '12', month: '12', year: '20' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-year': { text: dateConfig.validation.nonFourDigitYear.message }
    })
    expect(subfields).toEqual(['year'])
  })
})

describe('DateAnswer.validate (invalid date)', () => {
  it('should error for the 31st of a month without a 31st day', () => {
    const answer = new TestDateAnswer({ day: '31', month: '6', year: '2024' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.invalidDate.message }
    })
    expect(subfields).toEqual(['day', 'month', 'year'])
  })

  it('should error for the 29th of a non-leap year', () => {
    const answer = new TestDateAnswer({ day: '29', month: '2', year: '2025' })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.invalidDate.message }
    })
    expect(subfields).toEqual(['day', 'month', 'year'])
  })

  it('should accept the 29th leap year', () => {
    const answer = new TestDateAnswer({ day: '29', month: '2', year: '2024' })
    const { isValid } = answer.validate()
    expect(isValid).toBe(true)
  })
})

describe('DateAnswer.validation', () => {
  it('should accept dates that are in the past', () => {
    const yesterday = subDays(new Date(), 1)
    const answer = new TestDateAnswer({
      day: yesterday.getDate().toString(),
      month: (yesterday.getMonth() + 1).toString(),
      year: yesterday.getFullYear().toString()
    })
    const { isValid } = answer.validate()
    expect(isValid).toBe(true)
  })

  it("should accept today's date", () => {
    const today = new Date()
    const answer = new TestDateAnswer({
      day: today.getDate().toString(),
      month: (today.getMonth() + 1).toString(),
      year: today.getFullYear().toString()
    })
    const { isValid } = answer.validate()
    expect(isValid).toBe(true)
  })

  it('should reject dates that are in the future', () => {
    const tomorrow = addDays(new Date(), 2)
    const answer = new TestDateAnswer({
      day: tomorrow.getDate().toString(),
      month: (tomorrow.getMonth() + 1).toString(),
      year: tomorrow.getFullYear().toString()
    })
    const { isValid, errors, subfields } = answer.validate()
    expect(isValid).toBe(false)
    expect(errors).toStrictEqual({
      'date-day': { text: dateConfig.validation.futureDate.message }
    })
    expect(subfields).toEqual(['day', 'month', 'year'])
  })
})

describe('DateAnswer.toState', () => {
  it('should pass through valid data unaltered', () => {
    const answer = new TestDateAnswer(validPayload)
    expect(answer.toState()).toEqual(validPayload)
  })

  it('should trim whitespace', () => {
    const answer = new TestDateAnswer({
      day: ' 12 ',
      month: ' 12 ',
      year: ' 2024 '
    })

    expect(answer.toState()).toStrictEqual({
      day: '12',
      month: '12',
      year: '2024'
    })
  })

  it('should drop 0 prefixes from single-digit days and months', () => {
    const answer = new TestDateAnswer({
      day: '01',
      month: '02',
      year: ' 2024 '
    })

    expect(answer.toState()).toStrictEqual({
      day: '1',
      month: '2',
      year: '2024'
    })
  })
})

describe('DateAnswer.fromState', () => {
  it('should return just the value from the payload', () => {
    const answer = new TestDateAnswer(
      /** @type {DateData} */ ({ ...validPayload, nextPage: '/foo/bar' })
    )
    const state = answer.toState()
    expect(TestDateAnswer.fromState(state).value).toEqual(validPayload)
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(TestDateAnswer.fromState(undefined).value).toBeUndefined()
  })

  it('should return an undefined _data value if the state is undefined', () => {
    expect(TestDateAnswer.fromState(undefined)._data).toBeUndefined()
  })
})

describe('DateAnswer.html', () => {
  it('should render valid model, with a human readable month segment', () => {
    const answer = new TestDateAnswer({ day: '12', month: '1', year: '2024' })
    expect(answer.html).toBe('12 January 2024')
  })
})

describe('DateAnswer.viewModel', () => {
  const answer = new TestDateAnswer(invalidPayload)

  it('should return data to render without errors (if validate is false)', () => {
    expect(answer.viewModel({ validate: false, question })).toStrictEqual({
      fieldset: {
        legend: {
          text: question,
          classes: 'govuk-fieldset__legend--l',
          isPageHeading: true
        }
      },
      hint: {
        text: hint
      },
      id: 'date',
      items: [
        {
          classes: 'govuk-input--width-2',
          name: 'day',
          value: invalidPayload.day
        },
        {
          classes: 'govuk-input--width-2',
          name: 'month',
          value: invalidPayload.month
        },
        {
          classes: 'govuk-input--width-4',
          name: 'year',
          value: invalidPayload.year
        }
      ]
    })
  })

  it('should return errors that affect the whole date', () => {
    const missingDatePayload = { day: '', month: '', year: '' }
    const answer = new TestDateAnswer(missingDatePayload)
    expect(answer.viewModel({ validate: true, question })).toStrictEqual({
      fieldset: {
        legend: {
          text: question,
          classes: 'govuk-fieldset__legend--l',
          isPageHeading: true
        }
      },
      id: 'date',
      hint: {
        text: hint
      },
      errorMessage: {
        text: dateConfig.validation.missingDate.message
      },
      items: [
        {
          classes: 'govuk-input--width-2 govuk-input--error',
          name: 'day',
          value: missingDatePayload.day
        },
        {
          classes: 'govuk-input--width-2 govuk-input--error',
          name: 'month',
          value: missingDatePayload.month
        },
        {
          classes: 'govuk-input--width-4 govuk-input--error',
          name: 'year',
          value: missingDatePayload.year
        }
      ]
    })
  })

  it('should return errors that affect only affect one field', () => {
    const missingDatePayload = { day: '12', month: '', year: '2024' }
    const answer = new TestDateAnswer(missingDatePayload)
    expect(answer.viewModel({ validate: true, question })).toStrictEqual({
      fieldset: {
        legend: {
          text: question,
          classes: 'govuk-fieldset__legend--l',
          isPageHeading: true
        }
      },
      id: 'date',
      hint: {
        text: hint
      },
      errorMessage: {
        text: dateConfig.validation.missingMonth.message
      },
      items: [
        {
          classes: 'govuk-input--width-2',
          name: 'day',
          value: missingDatePayload.day
        },
        {
          classes: 'govuk-input--width-2 govuk-input--error',
          name: 'month',
          value: missingDatePayload.month
        },
        {
          classes: 'govuk-input--width-4',
          name: 'year',
          value: missingDatePayload.year
        }
      ]
    })
  })
})

describe('DateAnswer.template', () => {
  it('should return the text model template', () => {
    const text = new TestDateAnswer(validPayload)
    expect(text.template).toBe('model/answer/date/date.njk')
  })
})
