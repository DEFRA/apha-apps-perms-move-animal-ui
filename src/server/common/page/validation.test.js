import Joi from 'joi'
import { validate } from './validation.js'

describe('page validate', () => {
  const schema = Joi.object({
    a: Joi.string().required().messages({
      'any.required': 'a should not be missing'
    }),
    b: Joi.string().max(5).messages({
      'string.max': 'b should not be too long'
    })
  })

  it('should take a Joi schema, input data & returna validation result', () => {
    expect(validate(schema, { b: '123' })).toEqual({
      isValid: false,
      errors: {
        a: 'a should not be missing'
      }
    })
  })

  it('should run validation against all fields', () => {
    expect(validate(schema, { b: '123456' })).toEqual({
      isValid: false,
      errors: {
        b: 'b should not be too long',
        a: 'a should not be missing'
      }
    })
  })
})
