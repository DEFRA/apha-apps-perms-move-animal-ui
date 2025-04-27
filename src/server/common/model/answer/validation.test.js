import Joi from 'joi'
import { sanitise, validateAnswerAgainstSchema } from './validation.js'

describe('validateAnswerAgainstSchema', () => {
  const validationSchema = Joi.object({
    addressLine1: Joi.string().required(),
    postcode: Joi.string().required()
  })

  it('should return valid result when schema validation passes', () => {
    const value = { addressLine1: 'Address line 1', postcode: 'postcode' }
    const result = validateAnswerAgainstSchema(validationSchema, value)

    expect(result).toEqual({
      isValid: true,
      errors: {}
    })
  })

  it('should return invalid result with error details when schema validation fails', () => {
    const value = { addressLine1: 'Address line 1' }
    const result = validateAnswerAgainstSchema(validationSchema, value)

    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveProperty('postcode')
    expect(result.errors.postcode.text).toMatch(/"postcode" is required/)
  })
})

describe('sanitise', () => {
  it('should remove all HTML tags and attributes from the input value', () => {
    const value = '<div><p>Hello <strong>World</strong></p></div>'
    const helpers = { error: jest.fn() }
    const result = sanitise(value, helpers)

    expect(result).toBe('Hello World')
    expect(helpers.error).not.toHaveBeenCalled()
  })

  it('should return an error if the sanitised value is empty and the field is not optional', () => {
    const value = '<div></div>'
    const helpers = { error: jest.fn() }
    sanitise(value, helpers, { optional: false })

    expect(helpers.error).toHaveBeenCalledWith('string.sanitisedEmpty')
  })

  it('should return an empty string if the sanitised value is empty but the field is optional', () => {
    const value = '<div></div>'
    const helpers = { error: jest.fn() }
    const result = sanitise(value, helpers, { optional: true })

    expect(result).toBe('')
    expect(helpers.error).not.toHaveBeenCalled()
  })

  it('should return the original value if it contains no HTML tags', () => {
    const value = 'Plain text'
    const helpers = { error: jest.fn() }
    const result = sanitise(value, helpers)

    expect(result).toBe('Plain text')
    expect(helpers.error).not.toHaveBeenCalled()
  })
})
