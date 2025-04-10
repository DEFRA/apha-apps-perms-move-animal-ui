/**
 * @typedef {{ day: string, month: string, year: string }} DateData
 */

export const MONTH_DAYS = 31
export const YEAR_MONTHS = 12

/** @param {Date} inputDate */
export const createDateAsUTC = (inputDate) =>
  new Date(
    Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate())
  )

/** @param {DateData | undefined} date */
export const toJSDate = (date) => {
  return new Date(
    Date.UTC(Number(date?.year), Number(date?.month) - 1, Number(date?.day))
  )
}

/** @param {DateData} value */
export const isValidDate = (value) => {
  const date = toJSDate(value)
  return (
    date.getFullYear() === Number(value.year) &&
    date.getMonth() === Number(value.month) - 1 &&
    date.getDate() === Number(value.day)
  )
}

/**
 * @param {DateData} inputDate
 * @returns {boolean}
 */
export const isFutureDate = (inputDate) => {
  const currentDate = createDateAsUTC(new Date())
  const date = toJSDate(inputDate)

  return date > currentDate
}
