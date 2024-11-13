import { statusCodes } from '~/src/server/common/constants/status-codes.js'
/* global expect, test */

/**
 * @param {OutgoingHttpHeaders} headers
 * @param {string} name
 * @returns {string}
 */
const findCookie = (headers, name) => {
  const setCookie = headers['set-cookie']

  /** @type {string[] | undefined} */
  const cookies = typeof setCookie === 'string' ? [setCookie] : setCookie
  return cookies?.find((h) => h?.includes(`${name}=`)) ?? ''
}

/**
 * @param {string} cookieString
 */
const extractCookieValue = (cookieString) =>
  cookieString.split('=')[1].split(';')[0]

/**
 * @param {string} payload
 * @param {OutgoingHttpHeaders} headers
 */
const expectCsrf = (payload, headers) => {
  const token = extractCookieValue(findCookie(headers, 'crumb'))
  expect(token).not.toHaveLength(0)
  expect(payload).toContain(
    `<input type="hidden" name="crumb" value="${token}"`
  )
}

/**
 * @param {function(): Server} serverFn
 * @param {ServerInjectOptions} injectionOptions
 */
export const testCrsfProtectedPost = (serverFn, injectionOptions) =>
  test('should reject if experiencing an apparent CRSF attack (they have their session cookie, but no hidden form value)', async () => {
    const { statusCode } = await serverFn().inject({
      ...injectionOptions,
      headers: {
        ...(injectionOptions.headers ?? {}),
        Cookie: 'crumb=crsf-value'
      }
    })

    expect(statusCode).toEqual(statusCodes.forbidden)
  })

/**
 * @param {function(): Server} serverFn
 * @param {ServerInjectOptions} injectionOptions
 */
export const testCrsfProtectedGet = (serverFn, injectionOptions) =>
  test('should reject if experiencing an apparent CRSF attack (they have their session cookie, but no hidden form value)', async () => {
    const { headers, payload } = await serverFn().inject(injectionOptions)

    expectCsrf(payload, headers)
  })

/**
 * @param {ServerInjectOptions} injectionOptions
 * @returns {ServerInjectOptions}
 */
export const withCrsfProtection = (injectionOptions) => ({
  ...injectionOptions,
  payload: {
    ...(typeof injectionOptions.payload === 'object'
      ? injectionOptions.payload
      : {}),
    crumb: 'crsf-value'
  },
  headers: {
    ...(injectionOptions.headers ?? {}),
    Cookie: 'crumb=crsf-value'
  }
})

/**
 * @import { OutgoingHttpHeaders } from 'http'
 * @import { ServerInjectOptions, Server } from '@hapi/hapi'
 */
