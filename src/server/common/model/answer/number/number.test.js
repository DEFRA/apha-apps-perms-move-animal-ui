import { NumberAnswer, numberSchema } from './number.js'

// Mock the validateAnswerAgainstSchema function
jest.mock('../validation.js', () => ({
  validateAnswerAgainstSchema: jest.fn()
}))

const nonNumericInputs = ['abc', '=123']
const negativeInputs = ['-1', '-99999']
const nonIntegerInputs = ['0.5', '-0.123', '9999.999']

class TestNumberAnswer extends NumberAnswer {
  static config = { payloadKey: 'test', validation: {} }
}

describe('NumberAnswer', () => {
  describe('type property', () => {
    it('should return "number" as the type', () => {
      const answer = new TestNumberAnswer({ test: '42' })
      expect(answer.type).toBe('number')
    })
  })

  describe('toState method', () => {
    it('should convert valid string value to number', () => {
      const answer = new TestNumberAnswer({ test: '42' })
      expect(answer.toState()).toBe(42)
    })

    it('should return undefined for empty string', () => {
      const answer = new TestNumberAnswer({ test: '' })
      expect(answer.toState()).toBeUndefined()
    })

    it('should return undefined for non-numeric string', () => {
      const answer = new TestNumberAnswer({ test: 'abc' })
      expect(answer.toState()).toBeUndefined()
    })

    it('should handle leading/trailing whitespace', () => {
      const answer = new TestNumberAnswer({ test: '  123  ' })
      expect(answer.toState()).toBe(123)
    })
  })

  describe('data property', () => {
    it('should return data with type "number" and numeric value', () => {
      const answer = new TestNumberAnswer({ test: '99' })
      const data = answer.data

      expect(data.type).toBe('number')
      expect(data.value).toBe(99)
      expect(typeof data.value).toBe('number')
    })

    it('should return undefined value for empty string', () => {
      const answer = new TestNumberAnswer({ test: '' })
      const data = answer.data

      expect(data.type).toBe('number')
      expect(data.value).toBeUndefined()
    })
  })

  describe('fromState static method', () => {
    it('should create NumberAnswer from string state', () => {
      const answer = TestNumberAnswer.fromState('42')
      expect(answer).toBeInstanceOf(NumberAnswer)
      expect(answer.toState()).toBe(42)
    })

    it('should handle numeric state and convert to string for html', () => {
      const answer = TestNumberAnswer.fromState(String(42))
      expect(answer.html).toBe('42')
      expect(answer.toState()).toBe(42)
    })
  })
})

describe('numberSchema', () => {
  describe('basic validation', () => {
    it('should accept valid integer values', () => {
      const config = { payloadKey: 'test', validation: {} }
      const schema = numberSchema(config)

      expect(schema.validate({ test: 5 }).error).toBeUndefined()
      expect(schema.validate({ test: 0 }).error).toBeUndefined()
      expect(schema.validate({ test: -10 }).error).toBeUndefined()
    })

    it('should accept values within min/max range', () => {
      const config = {
        payloadKey: 'test',
        validation: {
          min: { value: 1, message: 'Too low' },
          max: { value: 100, message: 'Too high' }
        }
      }
      const schema = numberSchema(config)

      expect(schema.validate({ test: 1 }).error).toBeUndefined()
      expect(schema.validate({ test: 50 }).error).toBeUndefined()
      expect(schema.validate({ test: 100 }).error).toBeUndefined()
    })
  })

  describe('empty value handling', () => {
    it('should return error for empty value with custom message', () => {
      const config = {
        payloadKey: 'test',
        validation: { empty: { message: 'Value is required' } }
      }
      const schema = numberSchema(config)
      const { error } = schema.validate({ test: '' })

      expect(error?.details[0].message).toBe('Value is required')
    })

    it('should return default error for empty value without custom message', () => {
      const config = { payloadKey: 'test', validation: {} }
      const schema = numberSchema(config)
      const { error } = schema.validate({ test: '' })

      expect(error?.details[0].type).toBe('any.required')
    })
  })

  describe('min/max validation', () => {
    it('should return error for value greater than max', () => {
      const config = {
        payloadKey: 'test',
        validation: { max: { value: 10, message: 'Max is 10' } }
      }
      const schema = numberSchema(config)

      expect(schema.validate({ test: 11 }).error?.details[0].message).toBe(
        'Max is 10'
      )
    })

    it('should return error for value less than min', () => {
      const config = {
        payloadKey: 'test',
        validation: { min: { value: 1, message: 'Min is 1' } }
      }
      const schema = numberSchema(config)

      expect(schema.validate({ test: 0 }).error?.details[0].message).toBe(
        'Min is 1'
      )
    })
  })

  describe('integer validation', () => {
    it.each(nonIntegerInputs)(
      'should return error for non-integer value %s',
      (input) => {
        const config = { payloadKey: 'test', validation: {} }
        const schema = numberSchema(config)

        expect(schema.validate({ test: input }).error?.details[0].message).toBe(
          'Enter a whole number'
        )
      }
    )

    it('should use custom wholeNumberRequired message when provided', () => {
      const config = {
        payloadKey: 'test',
        validation: {
          wholeNumberRequired: { message: 'Custom whole number message' }
        }
      }
      const schema = numberSchema(config)

      expect(schema.validate({ test: 3.14 }).error?.details[0].message).toBe(
        'Custom whole number message'
      )
    })
  })

  describe('non-numeric input validation', () => {
    it.each(nonNumericInputs)(
      'should return error for non-number value %s',
      (input) => {
        const config = { payloadKey: 'test', validation: {} }
        const schema = numberSchema(config)

        expect(schema.validate({ test: input }).error?.details[0].message).toBe(
          'Enter a number'
        )
      }
    )
  })

  describe('negative number validation', () => {
    it.each(negativeInputs)(
      'should return error for negative input %s when min is 1',
      (input) => {
        const config = {
          payloadKey: 'test',
          validation: {
            min: { value: 1, message: 'Min is 1' }
          }
        }
        const schema = numberSchema(config)

        expect(schema.validate({ test: input }).error?.details[0].message).toBe(
          'Min is 1'
        )
      }
    )

    it('should accept negative numbers when no min constraint', () => {
      const config = { payloadKey: 'test', validation: {} }
      const schema = numberSchema(config)

      expect(schema.validate({ test: -5 }).error).toBeUndefined()
    })
  })

  describe('combined validation', () => {
    it('should enforce all validation rules together', () => {
      const config = {
        payloadKey: 'test',
        validation: {
          empty: { message: 'Required' },
          min: { value: 1, message: 'Min is 1' },
          max: { value: 100, message: 'Max is 100' }
        }
      }
      const schema = numberSchema(config)

      expect(schema.validate({ test: 50 }).error).toBeUndefined()
      expect(schema.validate({ test: 0 }).error?.details[0].message).toBe(
        'Min is 1'
      )
      expect(schema.validate({ test: 101 }).error?.details[0].message).toBe(
        'Max is 100'
      )
      expect(schema.validate({ test: '' }).error?.details[0].message).toBe(
        'Required'
      )
    })
  })
})
