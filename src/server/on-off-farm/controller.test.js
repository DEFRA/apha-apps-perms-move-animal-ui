import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'

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
 * @import { OutgoingHttpHeaders } from 'http'
 */

describe('#onOffFarmController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { payload, headers, statusCode } = await server.inject({
      method: 'GET',
      url: '/to-or-from-own-premises'
    })

    expect(payload).toEqual(
      expect.stringContaining('Are you moving the cattle on or off your farm?')
    )
    expectCsrf(payload, headers)
    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should process the result and provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'POST',
      url: '/to-or-from-own-premises',
      payload: {
        onOffFarm: 'on',
        crumb: 'crsf-value'
      },
      headers: {
        Cookie: 'crumb=crsf-value'
      }
    })

    expect(result).toEqual(
      expect.stringContaining('Are you moving the cattle on or off your farm?')
    )

    expect(result).toEqual(expect.not.stringContaining('There is a problem'))

    expect(result).toEqual(
      expect.stringContaining(
        '<input class="govuk-radios__input" id="off-farm-radio" name="onOffFarm" type="radio" value="off">'
      )
    )

    expect(result).toEqual(
      expect.stringContaining(
        '<input class="govuk-radios__input" id="on-farm-radio" name="onOffFarm" type="radio" value="on" checked>'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should display an error to the user if no value selected', async () => {
    const { result, statusCode } = await server.inject({
      method: 'POST',
      url: '/to-or-from-own-premises',
      payload: {
        crumb: 'crsf-value'
      },
      headers: {
        Cookie: 'crumb=crsf-value'
      }
    })

    expect(result).toEqual(
      expect.stringContaining(
        'Select if you are moving cattle on or off your farm'
      )
    )

    expect(result).toEqual(expect.stringContaining('There is a problem'))

    expect(statusCode).toBe(statusCodes.ok)
  })

  test('should reject if experiencing an apparent CRSF attack (they have their session cookie, but no hidden form value)', async () => {
    const { statusCode } = await server.inject({
      method: 'POST',
      url: '/to-or-from-own-premises',
      payload: {
        onOffFarm: 'on'
      },
      headers: {
        Cookie: 'crumb=crsf-value'
      }
    })

    expect(statusCode).toEqual(statusCodes.forbidden)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
