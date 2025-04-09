import Joi from 'joi'
import { validateAnswerAgainstSchema } from '../validation.js'
import { AnswerModel } from '../answer-model.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */
/** @import {AnswerValidationResult} from '../validation.js' */

/**
 * export @typedef {{
 *  hint: string,
 *  validation: {
 *    missingDate: { message: string },
 *    missingDay: { message: string },
 *    missingMonth: { message: string },
 *    missingYear: { message: string },
 *    invalidDay: { message: string },
 *    invalidMonth: { message: string },
 *    invalidYear: { message: string },
 *    invalidDate: { message: string },
 *    nonFourDigitYear: { message: string },
 *    futureDate: { message: string }
 *  }
 * }} DateConfig
 */

/** @param {DateData | undefined} date */
const toJSDate = (date) => {
  return new Date(
    Date.UTC(Number(date?.year), Number(date?.month) - 1, Number(date?.day))
  )
}

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
    const date = toJSDate(this.value)
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
      day: day !== undefined ? Number(day.trim()).toString() : '',
      month: month !== undefined ? Number(month.trim()).toString() : '',
      year: year !== undefined ? year.trim() : ''
    }
  }

  /** @returns {ValidationResultWithSubfields} */
  validate() {
    const schema = Joi.object({
      day: Joi.string()
        .pattern(/^\d{1,2}$/)
        .custom((value, helpers) => {
          const day = parseInt(value, 10)
          if (day < 1 || day > 31) {
            return helpers.error('any.invalid')
          }
          return value
        }, 'Day validation')
        .required()
        .messages({
          'string.pattern.base': 'Day must be a valid number between 1 and 31.',
          'string.empty': 'Date of birth of the oldest calf must include a day',
          'any.invalid': 'Day must be a valid number between 1 and 31.',
          'any.required': 'Day is required.'
        }),
      month: Joi.string()
        .pattern(/^\d{1,2}$/)
        .custom((value, helpers) => {
          const month = parseInt(value, 10)
          if (month < 1 || month > 12) {
            return helpers.error('any.invalid')
          }
          return value
        }, 'Month validation')
        .required()
        .messages({
          'string.pattern.base':
            'Month must be a valid number between 1 and 12.',
          'string.empty':
            'Date of birth of the oldest calf must include a month',
          'any.invalid': 'Month must be a valid number between 1 and 12.',
          'any.required': 'Month is required.'
        }),
      year: Joi.string()
        .pattern(/^\d{4}$/)
        .custom((value, helpers) => {
          const year = parseInt(value, 10)
          if (year < 1000 || year > 9999) {
            return helpers.error('any.invalid')
          }
          return value
        }, 'Year validation')
        .required()
        .messages({
          'string.pattern.base': 'Day of birth must be a real date',
          'string.empty':
            'Date of birth of the oldest calf must include a year',
          'any.invalid': 'Year of birth must include 4 numbers',
          'any.required': 'Year is required.'
        })
    })
      .custom((value, helpers) => {
        const { day, month, year } = value
        const date = new Date(
          Date.UTC(
            parseInt(year, 10),
            parseInt(month, 10) - 1,
            parseInt(day, 10)
          )
        )
        if (
          date.getUTCFullYear() !== parseInt(year, 10) ||
          date.getUTCMonth() !== parseInt(month, 10) - 1 ||
          date.getUTCDate() !== parseInt(day, 10)
        ) {
          return helpers.error('any.invalid')
        }
        return value
      }, 'Date validation')
      .messages({
        'any.invalid': 'Day of birth must be a real date'
      })

    const { errors, isValid } = validateAnswerAgainstSchema(
      schema,
      this._data ?? {}
    )

    /** @type {(keyof DateData)[]} */
    const subfields = Object.keys(errors)

    return {
      errors,
      isValid,
      subfields
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
      : {
          text:
            errors['date-day']?.text ??
            errors['date-month']?.text ??
            errors['date-year']?.text
        }

    const viewModel = {
      fieldset: {
        legend: {
          text: question,
          classes: 'govuk-fieldset__legend--l',
          isPageHeading: true
        }
      },
      id: 'date',
      hint: {
        text: this.config.hint
      },
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
