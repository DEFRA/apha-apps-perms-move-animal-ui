import { TZDate } from '@date-fns/tz'
import {
  differenceInDaysWithToday,
  isFutureDate,
  toBSTDate
} from './date-utils.js'

describe('Date Helpers', () => {
  describe('toBSTDate', () => {
    it('should convert a valid DateData object to a TZDate object in BST timezone', () => {
      const dateData = { day: '10', month: '04', year: '2025' }
      const bstDate = toBSTDate(dateData)
      expect(bstDate).toBeInstanceOf(TZDate)
      expect(bstDate.getFullYear()).toBe(2025)
      expect(bstDate.getMonth()).toBe(3)
      expect(bstDate.getDate()).toBe(10)
    })

    it('should handle undefined input gracefully', () => {
      const bstDate = toBSTDate(undefined)
      expect(bstDate).toBeInstanceOf(TZDate)
      expect(bstDate.getFullYear()).toBeNaN()
      expect(bstDate.getMonth()).toBeNaN()
      expect(bstDate.getDate()).toBeNaN()
    })
  })

  describe('isFutureDate', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new TZDate('2025-04-01T00:00:00', 'Europe/London'))
    })

    afterAll(jest.useRealTimers)

    it('should return true for a future date', () => {
      const futureDate = { day: '02', month: '04', year: '2025' }
      expect(isFutureDate(futureDate)).toBe(true)
    })

    it('should return false for a past date', () => {
      const pastDate = { day: '31', month: '03', year: '2025' }
      expect(isFutureDate(pastDate)).toBe(false)
    })

    it('should return false for the current date', () => {
      const currentDate = { day: '01', month: '04', year: '2025' }
      expect(isFutureDate(currentDate)).toBe(false)
    })

    it('should return false if current date matches in BST, even UTC-based system time is showing the previous day', () => {
      jest.setSystemTime(
        new TZDate('2025-04-01T00:30:00', 'Europe/London').withTimeZone('UTC')
      )
      expect(new Date().toISOString()).toBe('2025-03-31T23:30:00.000Z')

      const currentDate = { day: '01', month: '04', year: '2025' }
      expect(isFutureDate(currentDate)).toBe(false)
    })

    it('should return false if the current date matches UTC-based system time (since that will be behind BST in all cases)', () => {
      jest.setSystemTime(
        new TZDate('2025-04-01T00:30:00', 'Europe/London').withTimeZone('UTC')
      )
      expect(new Date().toISOString()).toBe('2025-03-31T23:30:00.000Z')

      const currentDate = { day: '31', month: '03', year: '2025' }
      expect(isFutureDate(currentDate)).toBe(false)
    })
  })

  describe('differenceInDaysWithToday', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new TZDate('2025-04-01T00:00:00', 'Europe/London'))
    })

    afterAll(jest.useRealTimers)

    it('should return a positive number for a past date', () => {
      const pastDate = { day: '31', month: '03', year: '2025' }
      const difference = differenceInDaysWithToday(pastDate)
      expect(difference).toBe(1)
    })

    it('should return a negative number for a future date', () => {
      const futureDate = { day: '02', month: '04', year: '2025' }
      const difference = differenceInDaysWithToday(futureDate)
      expect(difference).toBe(-1)
    })

    it('should return 0 for the current date', () => {
      const currentDate = { day: '01', month: '04', year: '2025' }
      const difference = differenceInDaysWithToday(currentDate)
      expect(difference).toBe(0)
    })

    it('should return 0 if the given date is actually the current date (when both are converted to BST)', () => {
      jest.setSystemTime(
        new TZDate('2025-04-01T00:30:00', 'Europe/London').withTimeZone('UTC')
      )
      expect(new Date().toISOString()).toBe('2025-03-31T23:30:00.000Z')

      const currentDate = { day: '01', month: '04', year: '2025' }
      const difference = differenceInDaysWithToday(currentDate)
      expect(difference).toBe(0)
    })

    it('should return 1 if the given date is before the current date (when both are converted to BST)', () => {
      jest.setSystemTime(
        new TZDate('2025-04-01T00:30:00', 'Europe/London').withTimeZone('UTC')
      )
      expect(new Date().toISOString()).toBe('2025-03-31T23:30:00.000Z')

      const currentDate = { day: '31', month: '03', year: '2025' }
      const difference = differenceInDaysWithToday(currentDate)

      expect(difference).toBe(1)
    })
  })
})
