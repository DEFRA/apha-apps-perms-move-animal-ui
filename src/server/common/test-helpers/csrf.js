import { statusCodes } from '~/src/server/common/constants/status-codes.js'
/* global expect, test */

/**
 * @param {string | string[] | undefined} cookie
 * @returns {string[]}
 */
const normaliseCookieHeader = (cookie) => {
  if (cookie === undefined) return []
  if (!Array.isArray(cookie)) return [cookie]
  return cookie
}

/**
 * @param {OutgoingHttpHeaders} headers
 * @param {string} name
 * @returns {string | undefined}
 */
const findCookie = (headers, name) => {
  const cookies = normaliseCookieHeader(headers['set-cookie'])
  return cookies?.find((h) => h?.includes(`${name}=`))
}

/**
 * @param {string} cookieString
 */
const extractCookieValue = (cookieString) =>
  cookieString.split('=')[1].split(';')[0]

/**
 * @param {function(): Server} serverFn
 * @param {ServerInjectOptions} injectionOptions
 */
export const testCsrfProtectedPost = (serverFn, injectionOptions) =>
  test('should reject if experiencing an apparent csrf attack (they have their session cookie, but no hidden form value)', async () => {
    const { statusCode } = await serverFn().inject({
      ...injectionOptions,
      headers: {
        ...(injectionOptions.headers ?? {}),
        Cookie: 'crumb=csrf-value'
      }
    })

    expect(statusCode).toEqual(statusCodes.forbidden)
  })

/**
 * @param {function(): Server} serverFn
 * @param {ServerInjectOptions} injectionOptions
 */
export const testCsrfProtectedGet = (serverFn, injectionOptions) =>
  test('should contain a cookie with a set CSRF value, and contain a hidden form field to submit that CSRF back to the server', async () => {
    const { headers, payload } = await serverFn().inject(injectionOptions)

    const token = extractCookieValue(findCookie(headers, 'crumb') ?? '')
    expect(token).not.toHaveLength(0)
    expect(payload).toContain(
      `<input type="hidden" name="crumb" value="${token}"`
    )
  })

/**
 * @param {ServerInjectOptions} injectionOptions
 * @returns {ServerInjectOptions}
 */
export const withCsrfProtection = (injectionOptions) => ({
  ...injectionOptions,
  payload: {
    ...(typeof injectionOptions.payload === 'object'
      ? injectionOptions.payload
      : {}),
    crumb: 'csrf-value'
  },
  headers: {
    ...(injectionOptions.headers ?? {}),
    Cookie: 'crumb=csrf-value'
  }
})

/**
 * @import { OutgoingHttpHeaders } from 'http'
 * @import { ServerInjectOptions, Server } from '@hapi/hapi'
 */
