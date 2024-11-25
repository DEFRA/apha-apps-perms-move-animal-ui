import Joi from 'joi'

export const CphNumberSchema = Joi.string()
  .required()
  .valid('on', 'off')
  .messages({
    'any.valid':
      'Select if you are moving cattle on or off your farm or premises'
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
