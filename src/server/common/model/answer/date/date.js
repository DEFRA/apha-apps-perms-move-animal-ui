import { AnswerModel } from '../answer-model.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'
import {
  isFutureDate,
  MONTH_DAYS,
  toBSTDate,
  YEAR_MONTHS
} from './date-utils.js'
import {
  allFieldsError,
  fieldError,
  isDigits,
  isFourDigits,
  isMissing,
  isZeroPaddedDigitBetween,
  isValidDate
} from './date-validation-utils.js'

/** @import {AnswerViewModelOptions} from '../answer-model.js' */
/** @import {AnswerValidationResult} from '../validation.js' */
/** @import {DateData} from './date-utils.js' */

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
    const date = toBSTDate(this.value)
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
    const { validation } = this.config

    if (this.value === undefined) {
      return allFieldsError(validation.missingDate.message)
    }

    let { year, month, day } = this.value
    year = year?.trim() ?? ''
    month = month?.trim() ?? ''
    day = day?.trim() ?? ''

    const isMissingDay = isMissing(day)
    const isMissingMonth = isMissing(month)
    const isMissingYear = isMissing(year)

    if (isMissingDay && isMissingMonth && isMissingYear) {
      return allFieldsError(validation.missingDate.message)
    }
    if (isMissingDay) {
      return fieldError('day', validation.missingDay.message)
    }
    if (isMissingMonth) {
      return fieldError('month', validation.missingMonth.message)
    }
    if (isMissingYear) {
      return fieldError('year', validation.missingYear.message)
    }

    if (!isZeroPaddedDigitBetween(day, 1, MONTH_DAYS)) {
      return fieldError('day', validation.invalidDay.message)
    }

    if (!isZeroPaddedDigitBetween(month, 1, YEAR_MONTHS)) {
      return fieldError('month', validation.invalidMonth.message)
    }

    if (!isDigits(year)) {
      return fieldError('year', validation.invalidYear.message)
    }
    if (!isFourDigits(year)) {
      return fieldError('year', validation.nonFourDigitYear.message)
    }

    if (!isValidDate({ year, month, day })) {
      return allFieldsError(validation.invalidDate.message)
    }

    if (isFutureDate(this.value)) {
      return allFieldsError(validation.futureDate.message)
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
   * @param {DateData} fields
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
