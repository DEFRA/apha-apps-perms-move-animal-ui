/**
 *
 * @typedef {{text: string}} ValidationError
 * @typedef {{
 *   isValid: boolean,
 *   errors: {[key:string]: ValidationError}
 * }} ValidationResult
 *
 * @import { Schema } from 'joi'
 */

/**
 * @param {Schema} schema
 * @param {object} value
 * @returns {ValidationResult}
 */
export const validateAgainstSchema = (schema, value) => {
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
