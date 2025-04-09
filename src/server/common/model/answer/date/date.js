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
    const { validation } = this.config

    /**
     * @param {string} message
     * @returns {ValidationResultWithSubfields}
     */
    const allFieldsError = (message) => ({
      isValid: false,
      errors: { 'date-day': { text: message } },
      subfields: ['day', 'month', 'year']
    })

    /**
     * @param {keyof DateData} subfield
     * @param {string} message
     * @returns {ValidationResultWithSubfields}
     */
    const fieldError = (subfield, message) => ({
      isValid: false,
      errors: { [`date-${subfield}`]: { text: message } },
      subfields: [subfield]
    })

    if (this.value === undefined) {
      return allFieldsError(validation.missingDate.message)
    }

    let { year, month, day } = this.value
    year = year.trim()
    month = month.trim()
    day = day.trim()

    /**
     * @param {string | undefined} value
     */
    const isMissing = (value) => value === undefined || value === ''

    const isDayMissing = isMissing(day)
    const isMonthMissing = isMissing(month)
    const isYearMissing = isMissing(year)

    if (isDayMissing && isMonthMissing && isYearMissing) {
      return allFieldsError(validation.missingDate.message)
    }
    if (isDayMissing) {
      return fieldError('day', validation.missingDay.message)
    }
    if (isMonthMissing) {
      return fieldError('month', validation.missingMonth.message)
    }
    if (isYearMissing) {
      return fieldError('year', validation.missingYear.message)
    }

    const zeroPaddedRegex = /^((0?[1-9]{1})|([1-9][0-9]))$/

    /**
     * @param {string} str
     * @param {number} min
     * @param {number} max
     */
    const isZeroPaddedDigitBetween = (str, min, max) =>
      str.match(zeroPaddedRegex) !== null &&
      Number(str) >= min &&
      Number(str) <= max

    if (!isZeroPaddedDigitBetween(day, 1, 31)) {
      return fieldError('day', validation.invalidDay.message)
    }
    if (!isZeroPaddedDigitBetween(month, 1, 12)) {
      return fieldError('month', validation.invalidMonth.message)
    }

    /** @param {string} str */
    const isDigits = (str) => str.match(/^\d*$/) !== null

    /** @param {string} str */
    const isFourDigits = (str) => str.match(/^\d{4}$/) !== null

    if (!isDigits(year)) {
      return fieldError('year', validation.invalidYear.message)
    }
    if (!isFourDigits(year)) {
      return fieldError('year', validation.nonFourDigitYear.message)
    }

    /** @param {DateData} value */
    const isValidDate = (value) => {
      const date = toJSDate(value)
      return (
        date.getFullYear() === Number(value.year) &&
        date.getMonth() === Number(value.month) - 1 &&
        date.getDate() === Number(value.day)
      )
    }

    if (!isValidDate({ year, month, day })) {
      return allFieldsError(validation.invalidDate.message)
    }

    /** @param {Date} date */
    const createDateAsUTC = (date) =>
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

    const currentDate = createDateAsUTC(new Date())
    const date = toJSDate(this.value)

    if (date > currentDate) {
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
