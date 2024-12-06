import { validateApplication } from './validation.js'

const baseMockSection = {
  toState: jest.fn(),
  value: 'value',
  html: '',
  _data: {}
}

const validSection = {
  ...baseMockSection,
  validate: jest.fn().mockReturnValue({ isValid: true })
}

const invalidSection = {
  ...baseMockSection,
  validate: jest.fn().mockReturnValue({ isValid: false })
}

describe('validateSection', () => {
  it('should return isValid as true when all answers are valid', () => {
    const data = {
      answer1: validSection,
      answer2: validSection
    }

    const { isValid, result } = validateApplication(data)

    expect(isValid).toBe(true)
    expect(result.answer1.isValid).toBe(true)
    expect(result.answer2.isValid).toBe(true)
  })

  it('should return isValid as false when at least one answer is invalid', () => {
    const data = {
      answer1: validSection,
      answer2: invalidSection
    }

    const { isValid, result } = validateApplication(data)

    expect(isValid).toBe(false)
    expect(result.answer1.isValid).toBe(true)
    expect(result.answer2.isValid).toBe(false)
  })

  it('should return the correct validation result for each answer', () => {
    const data = {
      answer1: {
        ...baseMockSection,
        validate: jest.fn().mockReturnValue({ isValid: true, errors: {} })
      },
      answer2: {
        ...baseMockSection,
        validate: jest
          .fn()
          .mockReturnValue({ isValid: false, errors: { field1: 'Invalid' } })
      }
    }

    const { isValid, result } = validateApplication(data)

    expect(isValid).toBe(false)
    expect(result.answer1).toEqual({ isValid: true, errors: {} })
    expect(result.answer2).toEqual({
      isValid: false,
      errors: { field1: 'Invalid' }
    })
  })
})
