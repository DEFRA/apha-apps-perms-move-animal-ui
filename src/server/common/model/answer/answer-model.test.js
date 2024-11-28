import Joi from 'joi'
import { AnswerModel, validateAgainstSchema } from './answer-model.js'

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

describe('AnswerModel', () => {
  const notImplementedError = 'Not implemented'
  let answer

  beforeEach(() => {
    answer = new AnswerModel()
  })

  it('should throw NotImplementedError when value getter is called', () => {
    expect(() => answer.value).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when toState is called', () => {
    expect(() => answer.toState()).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when validate is called', () => {
    expect(() => answer.validate()).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when fromState is called', () => {
    expect(() => AnswerModel.fromState({})).toThrow(notImplementedError)
  })

  it('should seal the object to prevent property additions or deletions', () => {
    answer = new AnswerModel({ key: 'value' })

    expect(() => {
      answer.something = 'should fail'
    }).toThrow()

    expect(() => {
      delete answer._data
    }).toThrow()
  })
})
