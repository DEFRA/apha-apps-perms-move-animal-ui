/**
 * @typedef {{ isValid: boolean, errors: {[key:string]: string} }} ValidationResult
 */

/**
 * @param {Schema} schema
 * @param {object} value
 * @returns {ValidationResult}
 */
export const validate = (schema, value) => {
  const { error } = schema.validate(value, { abortEarly: false })

  if (error === undefined) {
    return { isValid: true, errors: {} }
  } else {
    const errors = error.details?.map((x) => [
      x.context?.label ?? '',
      x.message
    ])

    return {
      isValid: false,
      errors: Object.fromEntries(errors ?? [])
    }
  }
}

/** @import { Schema } from 'joi' */
