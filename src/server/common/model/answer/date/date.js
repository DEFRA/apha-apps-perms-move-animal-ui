import Joi from 'joi'
import { AnswerModel } from '../answer-model.js'
import { validateAnswerAgainstSchema } from '../validation.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */
/** @import {AnswerValidationResult} from '../validation.js' */

const missingSchema = ({ message }) =>
  Joi.string().trim().required().messages({
    'any.required': message,
    'string.empty': message
  })

/**
 * export @typedef {{
 *  isPageHeading? : boolean,
 *  hint?: string,
 *  validation: {
 *    missingDate: { message: string },
 *    missingDay: { message: string },
 *    missingMonth: { message: string },
 *    missingYear: { message: string },
 *    invalidDay: { message: string },
 *    invalidMonth: { message: string },
 *    invalidYear: { message: string },
 *    invalidDate: { message: string },
 *    yearPattern: { message: string, pattern: RegExp },
 *    futureDate: { message: string }
 *  }
 * }} DateConfig
 */

/**
 * @typedef {{ day: string, month: string, year: string }} DateData
 */

/**
 * @typedef {AnswerValidationResult & {subfields: (keyof DateData)[]}} ValidationResultWithSubfields
 */

/**
 * @augments {AnswerModel<DateData>}
 */
export class DateAnswer extends AnswerModel {
  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {DateConfig} */
  get config() {
    return /** @type {any} */ (this.constructor).config
  }

  // eslint-disable-next-line jsdoc/require-returns-check
  /** @returns {DateConfig} */
  static get config() {
    throw new NotImplementedError()
  }

  /**
   * @returns {DateData | undefined}
   */
  get value() {
    return this._data
  }

  get html() {
    const date = new Date(
      Number(this.value?.year),
      Number(this.value?.month) - 1,
      Number(this.value?.day)
    )
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
  }

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get template() {
    return 'model/answer/date/date.njk'
  }

  /**
   * @returns {DateData}
   */
  toState() {
    const day = this.value?.day
    const month = this.value?.month
    const year = this.value?.year

    return {
      day: day !== undefined ? day.trim() : '',
      month: month !== undefined ? month.trim() : '',
      year: year !== undefined ? year.trim() : ''
    }
  }

  /** @returns {ValidationResultWithSubfields} */
  validate() {
    const { validation } = this.config
    const missingDay = validateAnswerAgainstSchema(
      missingSchema(validation.missingDay),
      this.value?.day
    )
    const missingMonth = validateAnswerAgainstSchema(
      missingSchema(validation.missingMonth),
      this.value?.month
    )
    const missingYear = validateAnswerAgainstSchema(
      missingSchema(validation.missingYear),
      this.value?.year
    )

    const convertMessage = (subfield, { isValid, errors }) => ({
      isValid: isValid,
      errors: { [subfield]: errors.value },
      subfields: [subfield]
    })

    if (!missingDay.isValid && !missingMonth.isValid && !missingYear.isValid) {
      return {
        isValid: false,
        errors: { day: { text: validation.missingDate.message } },
        subfields: ['day', 'month', 'year']
      }
    } else if (!missingDay.isValid) {
      return convertMessage('day', missingDay)
    } else if (!missingMonth.isValid) {
      return convertMessage('month', missingMonth)
    } else if (!missingYear.isValid) {
      return convertMessage('year', missingYear)
    }

    const numberSchema = Joi.string().trim().regex(/^\d+$/)
    const validDaySchema = numberSchema.custom((value, helper) => {
      if (Number(value) < 1 || Number(value) > 31) {
        return helper.message({
          'object.any': ''
        })
      }
    })

    if (validDaySchema.validate(this.value?.day).error) {
      return {
        isValid: false,
        errors: { day: { text: validation.invalidDay.message } },
        subfields: ['day']
      }
    }

    const validMonthSchema = numberSchema.custom((value, helper) => {
      if (Number(value) < 1 || Number(value) > 12) {
        return helper.message({
          'object.any': ''
        })
      }
    })
    if (validMonthSchema.validate(this.value?.month).error) {
      return {
        isValid: false,
        errors: { month: { text: validation.invalidMonth.message } },
        subfields: ['month']
      }
    }

    if (numberSchema.validate(this.value?.year).error) {
      return {
        isValid: false,
        errors: { year: { text: validation.invalidYear.message } },
        subfields: ['year']
      }
    }

    if (
      Joi.string()
        .trim()
        .pattern(validation.yearPattern.pattern)
        .validate(this.value?.year).error
    ) {
      return {
        isValid: false,
        errors: { year: { text: validation.yearPattern.message } },
        subfields: ['year']
      }
    }

    const isValidDate = ({ year, month, day }) => {
      const date = new Date(Number(year), Number(month) - 1, Number(day))
      return (
        date.getFullYear() === Number(year) &&
        date.getMonth() === Number(month) - 1 &&
        date.getDate() === Number(day)
      )
    }

    if (this.value !== undefined && !isValidDate(this.value)) {
      return {
        isValid: false,
        errors: { day: { text: validation.invalidDate.message } },
        subfields: ['day', 'month', 'year']
      }
    }

    return {
      isValid: true,
      errors: {},
      subfields: []
    }
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  viewModel({ validate, question }) {
    const {
      isValid,
      errors = {},
      subfields = []
    } = validate ? this.validate() : { isValid: true }

    const classesWithErrors = (subfieldErroring, originalClasses) => {
      return subfieldErroring
        ? `${originalClasses} govuk-input--error`
        : originalClasses
    }

    const errorMessage = isValid
      ? {}
      : { text: errors.day?.text ?? errors.month?.text ?? errors.year?.text }

    const viewModel = {
      fieldset: {
        legend: {
          text: question,
          classes: 'govuk-label--l',
          isPageHeading: true
        }
      },
      id: 'date',
      items: [
        {
          classes: classesWithErrors(
            subfields.includes('day'),
            'govuk-input--width-2'
          ),
          name: 'day',
          value: this.value?.day
        },
        {
          classes: classesWithErrors(
            subfields.includes('month'),
            'govuk-input--width-2'
          ),
          name: 'month',
          value: this.value?.month
        },
        {
          classes: classesWithErrors(
            subfields.includes('year'),
            'govuk-input--width-4'
          ),
          name: 'year',
          value: this.value?.year
        }
      ]
    }

    if (validate) {
      viewModel.errorMessage = errorMessage
    }

    return viewModel
  }

  /**
   * @param {object} fields
   */
  _extractFields({ day, month, year }) {
    return /** @type {DateData} */ ({ day, month, year })
  }

  /**
   * @param {DateData| undefined} state
   * @returns {DateAnswer}
   */
  static fromState(state) {
    return new this(state)
  }
}
