const key = 'referrer'

/** @import {Request} from '@hapi/hapi' */

/**
 * @param {Request} request
 * @param {string} value
 */
export const storeReferrer = (request, value) => {
  const yar = /** @type {any} */ (request).yar
  yar.flash(key, value, true)
}

/**
 * @param {Request} request
 * @returns string
 */
export const retrieveReferrer = (request) => {
  const yar = /** @type {any} */ (request).yar
  const value = yar.flash(key)

  if (typeof value === 'string') {
    return value
  }
  return '/task-list'
}
