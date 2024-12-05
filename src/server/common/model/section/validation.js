/**
 * @import {AnswerValidationResult} from '../answer/validation.js'
 * @import {AnswerModel} from '../answer/answer-model.js'
 */

/**
 * @typedef {{[key:string]: AnswerValidationResult}} ValidationResult
 * @typedef {{
 *   isValid: boolean,
 *   result: ValidationResult
 * }} SectionValidationResult
 */

/**
 * Validates all the answers within a section and outputs an overall isValid result.
 * @param {{[key:string]: AnswerModel}} data - The data to be validated.
 * @returns {SectionValidationResult} An object containing the validation result
 */
export const validateSection = (data) => {
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
