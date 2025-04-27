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
 * @param {object} options - Additional options.
 * @returns {string|Error} - The sanitised value if no changes were made, or an error if sanitization occurred.
 */
export const sanitise = (value, helpers, options = { optional: false }) => {
  const clean = sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {}
  })

  if (!options.optional && !clean) {
    // return an error if the value is not optional and the sanitised value is an empty string (or falsy)
    return helpers.error('string.sanitisedEmpty')
  }
  return clean
}
