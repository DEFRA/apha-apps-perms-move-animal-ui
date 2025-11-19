/**
 * @import {SectionValidation} from '../section/section-model/section-model.js'
 * @import {SectionModelV1} from '../section/section-model/section-model-v1.js'
 */

import mapValues from 'lodash/mapValues.js'

/**
 * @typedef {{[key:string]: SectionValidation}} ValidationResult
 * export @typedef {{
 *   isValid: boolean,
 *   result: ValidationResult
 * }} ApplicationValidationResult
 */

/**
 * Validates all the answers within the application and outputs an overall isValid result.
 * @param {{[key:string]: SectionModelV1}} data - The data to be validated.
 * @returns {ApplicationValidationResult} An object containing the validation result
 */
export const validateApplication = (data) => {
  const result = mapValues(data, (answer) => answer.validate())
  const isValid = Object.values(result).every((a) => a.isValid)

  return {
    isValid,
    result
  }
}
