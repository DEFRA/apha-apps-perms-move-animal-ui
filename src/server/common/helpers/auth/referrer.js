const key = 'referrer'

/** @import {Request} from '@hapi/hapi' */

/**
 * @param {Request} request
 * @param {string} value
 * @returns undefined
 */
export const storeReferrer = (request, value) => {
  request.yar.flash(key, value, true)
}

/**
 * @param {Request} request
 * @return string
 */
export const retrieveReferrer = (request) => {
  const value = request.yar.flash(key)

  if (typeof value === 'string') {
    return value
  }
  return '/task-list'
}
