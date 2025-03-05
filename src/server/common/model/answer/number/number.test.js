import { numberSchema } from './number.js'

// Mock the validateAnswerAgainstSchema function
jest.mock('../validation.js', () => ({
  validateAnswerAgainstSchema: jest.fn()
}))

describe('numberSchema', () => {
  it('should create a schema with required number validation', () => {
    const config = {
      payloadKey: 'testKey',
      validation: {
        empty: { message: 'Value is required' },
        max: { value: 10, message: 'Value must be less than or equal to 10' },
        min: { value: 1, message: 'Value must be greater than or equal to 1' }
      }
    }

    const schema = numberSchema(config)
    const { error } = schema.validate({ testKey: 5 })

    expect(error).toBeUndefined()
  })

  it('should return an error message for empty value', () => {
    const config = {
      payloadKey: 'testKey',
      validation: {
        empty: { message: 'Value is required' }
      }
    }

    const schema = numberSchema(config)
    const { error } = schema.validate({ testKey: '' })

    expect(error?.details[0].message).toBe('Value is required')
  })

  it('should return an error message for value greater than max', () => {
    const config = {
      payloadKey: 'testKey',
      validation: {
        max: { value: 10, message: 'Value must be less than or equal to 10' }
      }
    }

    const schema = numberSchema(config)
    const { error } = schema.validate({ testKey: 11 })

    expect(error?.details[0].message).toBe(
      'Value must be less than or equal to 10'
    )
  })

  it('should return an error message for value less than min', () => {
    const config = {
      payloadKey: 'testKey',
      validation: {
        min: { value: 1, message: 'Value must be greater than or equal to 1' }
      }
    }

    const schema = numberSchema(config)
    const { error } = schema.validate({ testKey: 0 })

    expect(error?.details[0].message).toBe(
      'Value must be greater than or equal to 1'
    )
  })

  it('should return an error message for non-integer value', () => {
    const config = {
      payloadKey: 'testKey',
      validation: {}
    }

    const schema = numberSchema(config)
    const { error } = schema.validate({ testKey: 1.5 })

    expect(error?.details[0].message).toBe('Enter a whole number')
  })

  it('should return an error message for non-number value', () => {
    const config = {
      payloadKey: 'testKey',
      validation: {}
    }

    const schema = numberSchema(config)
    const { error } = schema.validate({ testKey: 'abc' })

    expect(error?.details[0].message).toBe('Enter a number')
  })
})
