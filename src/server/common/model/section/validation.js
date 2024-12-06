/**
 * @import {AnswerValidationResult} from '../answer/validation.js'
 * @import {AnswerModel} from '../answer/answer-model.js'
 */

import mapValues from 'lodash/mapValues.js'

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
  const result = mapValues(data, (answer) => answer.validate())
  const isValid = Object.values(result).every((a) => a.isValid)

  return {
    isValid,
    result
  }
}
