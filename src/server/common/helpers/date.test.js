import { TZDate } from '@date-fns/tz'
import {
  toBSTDate,
  isFutureDate,
  createTZDate,
  differenceInDaysWithToday
} from './date.js'
import { isValidDate } from '../model/answer/date/date-validation-utils.js'

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

  describe('createTZDate', () => {
    it('should create a TZDate object with the same date and time as the input Date object', () => {
      const inputDate = new Date('2025-04-10T10:30:45.123Z')
      const tzDate = createTZDate(inputDate)
      expect(tzDate).toBeInstanceOf(TZDate)
      expect(tzDate.getFullYear()).toBe(inputDate.getFullYear())
      expect(tzDate.getMonth()).toBe(inputDate.getMonth())
      expect(tzDate.getDate()).toBe(inputDate.getDate())
      expect(tzDate.getHours()).toBe(inputDate.getHours())
      expect(tzDate.getMinutes()).toBe(inputDate.getMinutes())
      expect(tzDate.getSeconds()).toBe(inputDate.getSeconds())
      expect(tzDate.getMilliseconds()).toBe(inputDate.getMilliseconds())
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

      it('should return 0 if the given date when coverted to BST is actually the current date', () => {
        const currentDate = new Date()
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

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
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        const dateData = {
          day: currentDate.getUTCDate().toString(),
          month: (currentDate.getUTCMonth() + 1).toString(),
          year: currentDate.getUTCFullYear().toString()
        }

        // setting the system time to a date that is one day before the current date
        // and in BST timezone it is also one day before the current date
        jest.setSystemTime(
          new Date(
            Date.UTC(
              yesterday.getUTCFullYear(),
              yesterday.getUTCMonth(),
              yesterday.getUTCDate(),
              0,
              30,
              0,
              0
            )
          )
        )

        const difference = differenceInDaysWithToday(dateData)
        expect(difference).toBe(-1)
      })
    })
  })
})
