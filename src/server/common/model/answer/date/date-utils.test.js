import { TZDate } from '@date-fns/tz'
import {
  differenceInDaysWithToday,
  isFutureDate,
  toBSTDate
} from './date-utils.js'
import { subDays } from 'date-fns'

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
      const systemDateTime = new TZDate(
        '2025-04-01T00:30:00',
        'Europe/London'
      ).withTimeZone('UTC')
      expect(systemDateTime.toISOString()).toBe('2025-03-31T23:30:00.000+00:00')

      jest.setSystemTime(systemDateTime)

      const currentDate = { day: '01', month: '04', year: '2025' }
      expect(isFutureDate(currentDate)).toBe(false)
    })

    it('should return false if the current date matches UTC-based system time (since that will be behind BST in all cases)', () => {
      const systemDateTime = new TZDate(
        '2025-04-01T00:30:00',
        'Europe/London'
      ).withTimeZone('UTC')
      expect(systemDateTime.toISOString()).toBe('2025-03-31T23:30:00.000+00:00')

      jest.setSystemTime(systemDateTime)

      const currentDate = { day: '31', month: '03', year: '2025' }
      expect(isFutureDate(currentDate)).toBe(false)
    })
  })

  describe('differenceInDaysWithToday', () => {
    it('should return a positive number for a past date', () => {
      const pastDate = { day: '01', month: '01', year: '2000' }
      const difference = differenceInDaysWithToday(pastDate)
      expect(difference).toBeGreaterThan(0)
    })

    it('should return a negative number for a future date', () => {
      const futureDate = { day: '01', month: '01', year: '3000' }
      const difference = differenceInDaysWithToday(futureDate)
      expect(difference).toBeLessThan(0)
    })

    it('should return 0 for the current date', () => {
      const currentDate = new Date()
      const dateData = {
        day: currentDate.getUTCDate().toString(),
        month: (currentDate.getUTCMonth() + 1).toString(),
        year: currentDate.getUTCFullYear().toString()
      }
      const difference = differenceInDaysWithToday(dateData)
      expect(difference).toBe(0)
    })

    describe('when the server is in a different timezone', () => {
      beforeEach(() => {
        jest.useFakeTimers()
      })

      afterEach(() => {
        jest.useRealTimers()
      })

      it('should return 0 if the given date when coverted to UTC is actually the current date', () => {
        const currentDate = new Date()
        const yesterday = subDays(currentDate, 1)

        const dateData = {
          day: currentDate.getUTCDate().toString(),
          month: (currentDate.getUTCMonth() + 1).toString(),
          year: currentDate.getUTCFullYear().toString()
        }

        // setting the system time to a date that is one day before the current date
        // but in BST timezone it is still in the same date as current date
        jest.setSystemTime(
          new Date(
            Date.UTC(
              yesterday.getUTCFullYear(),
              yesterday.getUTCMonth(),
              yesterday.getUTCDate(),
              23,
              30,
              0,
              0
            )
          )
        )

        const difference = differenceInDaysWithToday(dateData)
        expect(difference).toBe(0)
      })

      it('should return -1 if the given date when coverted to BST is one day before current date', () => {
        const currentDate = new Date()
        const yesterday = subDays(currentDate, 1)

        const dateData = {
          day: currentDate.getUTCDate().toString(),
          month: (currentDate.getUTCMonth() + 1).toString(),
          year: currentDate.getUTCFullYear().toString()
        }

        // setting the system time to a date that is one day before the current date
        // and in BST timezone it is also one day before the current date
        jest.setSystemTime(
          new Date(
            yesterday.getFullYear(),
            yesterday.getMonth(),
            yesterday.getDate(),
            0,
            30,
            0,
            0
          )
        )
        const difference = differenceInDaysWithToday(dateData)
        expect(difference).toBe(-1)
      })
    })
  })
})
