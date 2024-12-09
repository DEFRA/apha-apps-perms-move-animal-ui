/**
 * @import { Schema } from 'joi'
 */

/**
 * @typedef {{text: string}} ValidationError
 * @typedef {{[key:string]: ValidationError}} AnswerErrors
 * export @typedef {{
 *   isValid: boolean,
 *   errors: AnswerErrors
 * }} AnswerValidationResult
 */

/**
 * @param {Schema} schema
 * @param {object} value
 * @returns {AnswerValidationResult}
 */
export const validateAnswerAgainstSchema = (schema, value) => {
  const { error } = schema.validate(value, {
    abortEarly: false,
    allowUnknown: true
  })

  if (error === undefined) {
    return { isValid: true, errors: {} }
  } else {
    const errors = error.details?.map((x) => [
      x.context?.label ?? '',
      { text: x.message }
    ])

    return {
      isValid: false,
      errors: Object.fromEntries(errors ?? [])
    }
  }
}
