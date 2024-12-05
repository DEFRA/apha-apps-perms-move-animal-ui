import { validateSection } from './validation.js'

const baseMockAnswer = {
  toState: jest.fn(),
  value: 'value',
  _data: {}
}

const validAnswer = {
  ...baseMockAnswer,
  validate: jest.fn().mockReturnValue({ isValid: true })
}

const invalidAnswer = {
  ...baseMockAnswer,
  validate: jest.fn().mockReturnValue({ isValid: false })
}

describe('validateSection', () => {
  it('should return isValid as true when all answers are valid', () => {
    const data = {
      answer1: validAnswer,
      answer2: validAnswer
    }

    const { isValid, result } = validateSection(data)

    expect(isValid).toBe(true)
    expect(result.answer1.isValid).toBe(true)
    expect(result.answer2.isValid).toBe(true)
  })

  it('should return isValid as false when at least one answer is invalid', () => {
    const data = {
      answer1: validAnswer,
      answer2: invalidAnswer
    }

    const { isValid, result } = validateSection(data)

    expect(isValid).toBe(false)
    expect(result.answer1.isValid).toBe(true)
    expect(result.answer2.isValid).toBe(false)
  })

  it('should return the correct validation result for each answer', () => {
    const data = {
      answer1: {
        ...baseMockAnswer,
        validate: jest.fn().mockReturnValue({ isValid: true, errors: {} })
      },
      answer2: {
        ...baseMockAnswer,
        validate: jest
          .fn()
          .mockReturnValue({ isValid: false, errors: { field1: 'Invalid' } })
      }
    }

    const { isValid, result } = validateSection(data)

    expect(isValid).toBe(false)
    expect(result.answer1).toEqual({ isValid: true, errors: {} })
    expect(result.answer2).toEqual({
      isValid: false,
      errors: { field1: 'Invalid' }
    })
  })
})
