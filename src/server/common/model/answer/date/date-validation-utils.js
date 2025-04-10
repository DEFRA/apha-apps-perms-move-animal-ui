import { toJSDate } from './date-utils.js'

/**
 * @import { DateData } from './date-utils.js'
 * @import { ValidationResultWithSubfields } from './date.js'
 */

/** @param {string} str */
export const isDigits = (str) => str.match(/^\d*$/) !== null

/**
 * @param {string | undefined} value
 */
export const isMissing = (value) => !value

/** @param {string} str */
export const isFourDigits = (str) => str.match(/^\d{4}$/) !== null

/** @param {DateData} value */
export const isValidDate = (value) => {
  const date = toJSDate(value)
  return (
    date.getFullYear() === Number(value.year) &&
    date.getMonth() === Number(value.month) - 1 &&
    date.getDate() === Number(value.day)
  )
}

/**
 * @param {(keyof DateData)[]} subfields
 * @param {string} message
 * @returns {ValidationResultWithSubfields}
 */
export const createError = (subfields, message) => ({
  isValid: false,
  errors: subfields.reduce((acc, subfield) => {
    acc[`date-${subfield}`] = { text: message }
    return acc
  }, {}),
  subfields
})

/**
 * @param {string} str
 * @param {number} min
 * @param {number} max
 */
export const isZeroPaddedDigitBetween = (str, min, max) => {
  const zeroPaddedRegex = /^((0?[1-9])|([1-9]\d))$/
  return (
    str.match(zeroPaddedRegex) !== null &&
    Number(str) >= min &&
    Number(str) <= max
  )
}

/**
 * @param {string} message
 * @returns {ValidationResultWithSubfields}
 */
export const allFieldsError = (message) => ({
  isValid: false,
  errors: { 'date-day': { text: message } },
  subfields: ['day', 'month', 'year']
})

/**
 * @param {keyof DateData} subfield
 * @param {string} message
 * @returns {ValidationResultWithSubfields}
 */
export const fieldError = (subfield, message) => ({
  isValid: false,
  errors: { [`date-${subfield}`]: { text: message } },
  subfields: [subfield]
})
