import Joi from 'joi'

/**
 * A Joi validation schema that performs custom validation on a section object.
 * It checks if any of the object's values are invalid based on their own `validate` method.
 * If any value is invalid, it returns a validation error.
 * @type {Joi.ObjectSchema}
 * @param {object} data - The object to validate.
 * @param {object} helpers - Joi helpers for custom validation.
 * @returns {object} - The validated data or an error if validation fails.
 */
export const sectionValidationSchema = Joi.object().custom((data, helpers) => {
  const invalid = Object.values(data).some((item) => {
    return !item.validate().isValid
  })

  if (invalid) {
    return helpers.error('any.invalid')
  }
  return data
})
