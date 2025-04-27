import sanitizeHtml from 'sanitize-html'

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

/**
 * Sanitises the input value by removing any HTML tags and attributes.
 * If the sanitised value differs from the original, an error is returned.
 * @param {string} value - The input value to be sanitised.
 * @param {object} helpers - An object containing helper functions for validation.
 * @returns {string|Error} - The sanitised value if no changes were made, or an error if sanitization occurred.
 */
export const sanitise = (value, helpers) => {
  const clean = sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {}
  })

  // This error could cause issues when we don't really want to show an error
  // for instance when the field is optional and result is empty string
  // BUT if we are happy to have a generic error message every time we have done
  // some sanitisation we can uncomment this

  // if (clean !== value) {
  //   return helpers.error('string.sanitised')
  // }
  return clean
}
