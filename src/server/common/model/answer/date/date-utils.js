import { TZDate } from '@date-fns/tz'
import { differenceInCalendarDays } from 'date-fns'

/**
 * @typedef {{ day: string | undefined, month: string | undefined, year: string | undefined }} DateData
 */

export const MONTH_DAYS = 31
export const YEAR_MONTHS = 12

/**
 * Creates a TZ Date object using the given date
 * @param {Date} inputDate
 */
export const createTZDate = (inputDate) =>
  new TZDate(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate(),
    inputDate.getHours(),
    inputDate.getMinutes(),
    inputDate.getSeconds(),
    inputDate.getMilliseconds(),
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

/**
 * Converts a DateData object to a TZDate object assuming BST timezone
 * @param {DateData | undefined} date
 */
export const toBSTDate = (date) => {
  return new TZDate(
    Number(date?.year),
    Number(date?.month) - 1,
    Number(date?.day),
    'Europe/London'
  )
}

/**
 * @param {DateData} inputDate
 * @returns {number}
 */
export const differenceInDaysWithToday = (inputDate) => {
  const currentDate = createTZDate(new Date())
  const dateToCompare = toBSTDate(inputDate)

  return differenceInCalendarDays(currentDate, dateToCompare)
}

/**
 * @param {DateData} inputDate
 * @returns {boolean}
 */
export const isFutureDate = (inputDate) => {
  return differenceInDaysWithToday(inputDate) < 0
}
