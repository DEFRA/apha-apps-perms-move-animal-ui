import Joi from 'joi'

const postcodeRegex = /^(GIR 0AA|[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2})$/i

const maxLength = 255
const maxLengthMessage = (key) =>
  `${key} must be no longer than ${maxLength} characters`

const addressLine1Required =
  'Enter address line 1, typically the building and street'
const addressTownRequired = 'Enter town or city'
const postcodeRequired = 'Enter postcode'

const addressSchema = Joi.object({
  addressLine1: Joi.string()
    .required()
    .max(255)
    .messages({
      'any.required': addressLine1Required,
      'string.empty': addressLine1Required,
      'string.max': maxLengthMessage('Address line 1')
    }),
  addressLine2: Joi.string()
    .allow('')
    .max(255)
    .messages({
      'string.max': maxLengthMessage('Address Line 2')
    }),
  addressTown: Joi.string()
    .required()
    .max(255)
    .messages({
      'any.required': addressTownRequired,
      'string.empty': addressTownRequired,
      'string.max': maxLengthMessage('Address town')
    }),
  addressCounty: Joi.string().allow(''),
  addressPostcode: Joi.string().required().pattern(postcodeRegex).messages({
    'any.required': postcodeRequired,
    'string.empty': postcodeRequired,
    'string.pattern.base': 'Enter a full UK postcode'
  })
})

/**
 * @param {OriginAddress} originAddress
 * @returns {{isValid: boolean, errors: object}}
 */
export default (originAddress) => {
  const result = addressSchema
    .options({ abortEarly: false })
    .validate(originAddress)
  const errors = result.error?.details.map(({ context, message }) => [
    /** @type string */ (context?.key),
    { text: message }
  ])

  return {
    isValid: result.error === undefined,
    errors: errors && Object.fromEntries(errors)
  }
}

/**
 * export @typedef {{
 *  addressLine1: string;
 *  addressLine2: string;
 *  addressTown: string;
 *  addressCounty: string;
 *  addressPostcode: string;
 * }} OriginAddress
 */
