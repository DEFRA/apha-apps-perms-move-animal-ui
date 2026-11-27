import Joi from 'joi'
import {
  resolveValidationMessage,
  validateAnswerAgainstSchema
} from './validation.js'

describe('resolveValidationMessage', () => {
  it('should translate a message with a key', () => {
    const translate = jest.fn().mockReturnValue('Translated message')

    expect(
      resolveValidationMessage(
        { message: 'Fallback message', i18nKey: 'test.error' },
        translate
      )
    ).toBe('Translated message')
    expect(translate).toHaveBeenCalledWith('test.error', 'Fallback message')
  })

  it('should use the fallback when the translator or key is missing', () => {
    const translate = jest.fn()

    expect(
      resolveValidationMessage({
        message: 'Fallback message',
        i18nKey: 'test.error'
      })
    ).toBe('Fallback message')
    expect(
      resolveValidationMessage({ message: 'Fallback message' }, translate)
    ).toBe('Fallback message')
    expect(resolveValidationMessage('Legacy message', translate)).toBe(
      'Legacy message'
    )
    expect(translate).not.toHaveBeenCalled()
  })
})

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
