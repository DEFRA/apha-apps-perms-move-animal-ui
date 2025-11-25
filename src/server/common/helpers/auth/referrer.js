const key = 'referrer'

/** @import {Request} from '@hapi/hapi' */

/**
 * @param {Request} request
 * @param {string} value
 */
export const storeReferrer = (request, value) => {
  request.yar.flash(key, value, true)
}

/**
 * @param {Request} request
 * @returns string
 */
export const retrieveReferrer = (request) => {
  // @ts-expect-error - yar.flash type definition issue
  const value = request.yar.flash(key)

  if (typeof value === 'string') {
    return value
  }
  return '/task-list'
}
