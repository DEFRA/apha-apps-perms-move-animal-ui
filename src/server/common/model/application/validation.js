/**
 * @import {SectionValidationResult} from '../section/validation.js'
 * @import {SectionModel} from '../section/section-model.js'
 */

/**
 * @typedef {{[key:string]: SectionValidationResult}} ValidationResult
 * @typedef {{
 *   isValid: boolean,
 *   result: ValidationResult
 * }} ApplicationValidationResult
 */

/**
 * Validates all the answers within the application and outputs an overall isValid result.
 * @param {{[key:string]: SectionModel}} data - The data to be validated.
 * @returns {ApplicationValidationResult} An object containing the validation result
 */
export const validateApplication = (data) => {
  /** @type {ValidationResult} */
  const result = {}
  let isValid = true

  Object.keys(data).forEach((key) => {
    result[key] = data[key].validate()
    isValid = isValid && result[key].isValid
  })

  return {
    isValid,
    result
  }
}
