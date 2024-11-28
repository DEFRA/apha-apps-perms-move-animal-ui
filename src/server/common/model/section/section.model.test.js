import Joi from 'joi'
import { SectionModel, validateAgainstSchema } from './section-model.js'

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

describe('SectionModel', () => {
  const notImplementedError = 'Not implemented'
  let section

  beforeEach(() => {
    section = new SectionModel()
  })

  it('should throw NotImplementedError when validate is called', () => {
    expect(() => section.validate()).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when fromState is called', () => {
    expect(() => SectionModel.fromState({})).toThrow(notImplementedError)
  })

  it('should seal the object to prevent property additions or deletions', () => {
    section = new SectionModel({ key: 'value' })

    expect(() => {
      section.something = 'should fail'
    }).toThrow()

    expect(() => {
      delete section._data
    }).toThrow()
  })
})
