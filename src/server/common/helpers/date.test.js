import { toJSDate, isValidDate, isFutureDate, createDateAsUTC } from './date.js'

describe('Date Helpers', () => {
  describe('toJSDate', () => {
    it('should convert DateData to a JavaScript Date object', () => {
      const dateData = { day: '15', month: '08', year: '2023' }
      const result = toJSDate(dateData)
      expect(result).toEqual(new Date(Date.UTC(2023, 7, 15)))
    })

    it('should handle undefined input gracefully', () => {
      const result = toJSDate(undefined)
      expect(result.toString()).toBe('Invalid Date')
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

  describe('isFutureDate', () => {
    it('should return true for a future date', () => {
      const futureDate = { day: '15', month: '08', year: '3000' }
      expect(isFutureDate(futureDate)).toBe(true)
    })

    it('should return false for a past date', () => {
      const pastDate = { day: '15', month: '08', year: '2000' }
      expect(isFutureDate(pastDate)).toBe(false)
    })

    it('should return false for the current date', () => {
      const currentDate = new Date()
      const dateData = {
        day: String(currentDate.getUTCDate()).padStart(2, '0'),
        month: String(currentDate.getUTCMonth() + 1).padStart(2, '0'),
        year: String(currentDate.getUTCFullYear())
      }
      expect(isFutureDate(dateData)).toBe(false)
    })
  })

  describe('createDateAsUTC', () => {
    it('should create a UTC date from a given date', () => {
      const inputDate = new Date('2023-08-15T12:00:00Z')
      const result = createDateAsUTC(inputDate)
      expect(result).toEqual(new Date(Date.UTC(2023, 7, 15)))
    })
  })
})
