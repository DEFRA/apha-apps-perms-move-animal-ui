import {
  isDigits,
  isMissing,
  isFourDigits,
  createError,
  isZeroPaddedDigitBetween,
  allFieldsError,
  fieldError,
  isValidDate
} from './date-validation-utils.js'
import { YEAR_MONTHS } from './date-utils.js'

const invalidDateMessage = 'Invalid date'

describe('date-validation-utils', () => {
  describe('isDigits', () => {
    it('should return true for a string of digits', () => {
      expect(isDigits('12345')).toBe(true)
    })

    it('should return false for a string with non-digit characters', () => {
      expect(isDigits('123a5')).toBe(false)
    })
  })

  describe('isMissing', () => {
    it('should return true for undefined or empty string', () => {
      expect(isMissing(undefined)).toBe(true)
      expect(isMissing('')).toBe(true)
    })

    it('should return false for a non-empty string', () => {
      expect(isMissing('value')).toBe(false)
    })
  })

  describe('isFourDigits', () => {
    it('should return true for a string with exactly four digits', () => {
      expect(isFourDigits('2023')).toBe(true)
    })

    it('should return false for a string with less or more than four digits', () => {
      expect(isFourDigits('123')).toBe(false)
      expect(isFourDigits('12345')).toBe(false)
    })
  })

  describe('isValidDate', () => {
    it('should return true for a valid date', () => {
      const dateData = { day: '15', month: '08', year: '2023' }
      expect(isValidDate(dateData)).toBe(true)
    })

    it('should return false for an invalid date', () => {
      const dateData = { day: '32', month: '13', year: '2023' }
      expect(isValidDate(dateData)).toBe(false)
    })
  })

  describe('createError', () => {
    it('should create an error object with the specified subfields and message', () => {
      const result = createError(['day', 'month'], invalidDateMessage)
      expect(result).toEqual({
        isValid: false,
        errors: {
          'date-day': { text: invalidDateMessage },
          'date-month': { text: invalidDateMessage }
        },
        subfields: ['day', 'month']
      })
    })
  })

  describe('isZeroPaddedDigitBetween', () => {
    it('should return true for a zero-padded digit within the range', () => {
      expect(isZeroPaddedDigitBetween('09', 1, YEAR_MONTHS)).toBe(true)
    })

    it('should return false for a digit outside the range', () => {
      expect(isZeroPaddedDigitBetween('13', 1, YEAR_MONTHS)).toBe(false)
    })

    it('should return false for a non-digit string', () => {
      expect(isZeroPaddedDigitBetween('abc', 1, YEAR_MONTHS)).toBe(false)
    })
  })

  describe('allFieldsError', () => {
    it('should create an error object for all date fields with the specified message', () => {
      const result = allFieldsError('All fields are required')
      expect(result).toEqual({
        isValid: false,
        errors: { 'date-day': { text: 'All fields are required' } },
        subfields: ['day', 'month', 'year']
      })
    })
  })

  describe('fieldError', () => {
    it('should create an error object for a specific field with the specified message', () => {
      const result = fieldError('month', 'Invalid month')
      expect(result).toEqual({
        isValid: false,
        errors: { 'date-month': { text: 'Invalid month' } },
        subfields: ['month']
      })
    })
  })
})
