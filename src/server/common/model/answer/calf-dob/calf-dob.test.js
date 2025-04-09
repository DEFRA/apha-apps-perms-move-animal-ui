import { DateAnswer } from '../date/date.js'
import { CalfDob } from './calf-dob.js'

const payload = {
  day: '12',
  month: '10',
  year: '2025'
}

describe('CalfDob', () => {
  it('should be a date', () => {
    expect(new CalfDob(payload)).toBeInstanceOf(DateAnswer)
  })

  it('should have the expected validation params', () => {
    const { validation } = CalfDob.config
    expect(validation.missingDate.message).toBe(
      'Enter the oldest calf’s date of birth'
    )
    expect(validation.missingDay.message).toBe(
      'Date of birth of the oldest calf must include a day'
    )
    expect(validation.missingMonth.message).toBe(
      'Date of birth of the oldest calf must include a month'
    )
    expect(validation.missingYear.message).toBe(
      'Date of birth of the oldest calf must include a year'
    )
    expect(validation.invalidDay.message).toBe(
      'Day of birth must be a real date'
    )
    expect(validation.invalidMonth.message).toBe(
      'Month of birth of the oldest calf must be a number between 1 and 12'
    )
    expect(validation.invalidYear.message).toBe(
      'Year of birth must be a real date'
    )
    expect(validation.yearPattern.message).toBe(
      'Year of birth must include 4 numbers'
    )
    expect(validation.invalidDate.message).toBe(
      'Day of birth must be a real date'
    )
    expect(validation.futureDate.message).toBe(
      'Date of birth of the oldest calf must be today or in the past'
    )
  })

  it('should validate that year cannot be fewer than 4 numbers', () => {
    const answer = new CalfDob({ day: '12', month: '10', year: '12' })
    expect(answer.validate().errors.year.text).toBe(
      CalfDob.config.validation.yearPattern.message
    )
  })

  it('should validate that year cannot be more than 4 numbers', () => {
    const answer = new CalfDob({ day: '12', month: '10', year: '12345' })
    expect(answer.validate().errors.year.text).toBe(
      CalfDob.config.validation.yearPattern.message
    )
  })

  it('should still allow whitespace', () => {
    const answer = new CalfDob({ day: '12', month: '10', year: '  12345  ' })
    expect(answer.validate().errors.year.text).toBe(
      CalfDob.config.validation.yearPattern.message
    )
  })
})
