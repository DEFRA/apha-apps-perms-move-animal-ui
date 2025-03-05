import { numberSchema } from './number.js'

// Mock the validateAnswerAgainstSchema function
jest.mock('../validation.js', () => ({
  validateAnswerAgainstSchema: jest.fn()
}))

const nonNumericInputs = ['abc', '=123']
const negativeInputs = ['-1', '-99999']
const nonIntegerInputs = ['0.5', '-0.123', '9999.999']

describe('numberSchema', () => {
  const config = {
    payloadKey: 'testKey',
    validation: {
      empty: { message: 'Value is required' },
      max: { value: 10, message: 'Value must be less than or equal to 10' },
      min: { value: 1, message: 'Value must be greater than or equal to 1' }
    }
  }
  const schema = numberSchema(config)

  it('should create a schema with required number validation', () => {
    const { error } = schema.validate({ testKey: 5 })
    expect(error).toBeUndefined()
  })

  it('should return an error message for empty value', () => {
    const { error } = schema.validate({ testKey: '' })
    expect(error?.details[0].message).toBe('Value is required')
  })

  it('should return an error message for value greater than max', () => {
    const { error } = schema.validate({ testKey: 11 })
    expect(error?.details[0].message).toBe(
      'Value must be less than or equal to 10'
    )
  })

  it('should return an error message for value less than min', () => {
    const { error } = schema.validate({ testKey: 0 })
    expect(error?.details[0].message).toBe(
      'Value must be greater than or equal to 1'
    )
  })

  it.each(nonIntegerInputs)(
    'should return an error message for non-integer value %s',
    (input) => {
      const { error } = schema.validate({ testKey: input })
      expect(error?.details[0].message).toBe('Enter a whole number')
    }
  )

  it.each(nonNumericInputs)(
    'should return an error message for non-number value %s',
    (input) => {
      const { error } = schema.validate({ testKey: input })
      expect(error?.details[0].message).toBe('Enter a number')
    }
  )

  it.each(negativeInputs)(
    'should return an error message for negative input %s',
    (input) => {
      const { error } = schema.validate({ testKey: input })
      expect(error?.details[0].message).toBe(
        'Value must be greater than or equal to 1'
      )
    }
  )
})
