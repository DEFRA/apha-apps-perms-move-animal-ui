import Joi from 'joi'
import { validateAgainstSchema } from './validation.js'

describe('validateAgainstSchema', () => {
  let validationSchema

  beforeEach(() => {
    validationSchema = Joi.object({
      addressLine1: Joi.string().required(),
      postcode: Joi.string().required()
    })
  })

  it('should return valid result when schema validation passes', () => {
    const value = { addressLine1: 'Address line 1', postcode: 'postcode' }
    const result = validateAgainstSchema(validationSchema, value)

    expect(result).toEqual({
      isValid: true,
      errors: {}
    })
  })

  it('should return invalid result with error details when schema validation fails', () => {
    const value = { addressLine1: 'Address line 1' }
    const result = validateAgainstSchema(validationSchema, value)

    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveProperty('postcode')
    expect(result.errors.postcode.text).toMatch(/"postcode" is required/)
  })
})
