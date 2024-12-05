import { validateSection } from './validation.js'
import { AnswerModel } from '../answer/answer-model.js'

class MockAnswer extends AnswerModel {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extractFields(data) {
    return data
  }
}

class ValidAnswer extends MockAnswer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_) {
    return { isValid: true, errors: {} }
  }
}

class InvalidAnswer extends MockAnswer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_) {
    return { isValid: false, errors: { field1: { text: 'Invalid' } } }
  }
}
const validAnswer = new ValidAnswer()

const invalidAnswer = new InvalidAnswer()

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
      answer1: validAnswer,
      answer2: invalidAnswer
    }

    const { isValid, result } = validateSection(data)

    expect(isValid).toBe(false)
    expect(result.answer1).toEqual({ isValid: true, errors: {} })
    expect(result.answer2).toEqual({
      isValid: false,
      errors: { field1: { text: 'Invalid' } }
    })
  })
})
