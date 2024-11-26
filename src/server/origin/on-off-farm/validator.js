import Joi from 'joi'

export const onOffFarmSchema = Joi.string()
  .required()
  .valid('on', 'off')
  .messages({
    'any.required':
      'Select if you are moving cattle on or off your farm or premises',
    'any.valid':
      'Select if you are moving cattle on or off your farm or premises'
  })

/**
 * @param {string} onOffFarm
 * @returns {{isValid: boolean, errors: object}}
 */
export default (onOffFarm) => {
  const result = onOffFarmSchema
    .options({ abortEarly: false })
    .validate(onOffFarm)
  const errors = result.error?.details.map(({ message }) => [
    'onOffFarm',
    { text: message }
  ])

  return {
    isValid: result.error === undefined,
    errors: errors && Object.fromEntries(errors)
  }
}
