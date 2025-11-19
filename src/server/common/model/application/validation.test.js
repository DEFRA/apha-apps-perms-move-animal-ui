import { SectionModelV1 } from '../section/section-model/section-model.js'
import { validateApplication } from './validation.js'

class ValidSection extends SectionModelV1 {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate() {
    return { isValid: true, result: {} }
  }
}

class InvalidSection extends SectionModelV1 {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate() {
    return {
      isValid: false,
      result: {
        answer1: { isValid: false, errors: { field1: { text: 'Invalid' } } }
      }
    }
  }
}

const validSection = new ValidSection([])
const invalidSection = new InvalidSection([])

describe('validateSection', () => {
  it('should return isValid as true when all sections are valid', () => {
    const data = {
      answer1: validSection,
      answer2: validSection
    }

    const { isValid, result } = validateApplication(data)

    expect(isValid).toBe(true)
    expect(result.answer1.isValid).toBe(true)
    expect(result.answer2.isValid).toBe(true)
  })

  it('should return isValid as false when at least one section is invalid', () => {
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
      answer1: validSection,
      answer2: invalidSection
    }

    const { isValid, result } = validateApplication(data)

    expect(isValid).toBe(false)
    expect(result.answer1).toEqual({ isValid: true, result: {} })
    expect(result.answer2).toEqual({
      isValid: false,
      result: {
        answer1: { isValid: false, errors: { field1: { text: 'Invalid' } } }
      }
    })
  })
})
