import Joi from 'joi'

const cphNumberRegex = /^([0-9]{2})\/([0-9]{3})\/([0-9]{4})$/i

export const CphNumberSchema = Joi.string()
  .required()
  .replace(' ', '')
  .pattern(cphNumberRegex)
  .messages({
    'any.required': 'Enter the farm or premises CPH number',
    'string.empty': 'Enter the farm or premises CPH number',
    'string.pattern.base':
      'Enter the CPH number in the correct format, for example, 12/345/6789'
  })

/**
 * @param {string} cphNumber
 * @returns {{isValid: boolean, errors: object}}
 */
export default (cphNumber) => {
  const result = CphNumberSchema.options({ abortEarly: false }).validate(
    cphNumber
  )
  const errors = result.error?.details.map(({ message }) => [
    'cphNumber',
    { text: message }
  ])

  return {
    isValid: result.error === undefined,
    errors: errors && Object.fromEntries(errors)
  }
}
