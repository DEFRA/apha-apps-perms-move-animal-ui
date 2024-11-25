import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import {
  testCsrfProtectedGet,
  testCsrfProtectedPost,
  withCsrfProtection
} from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

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
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/origin/to-or-from-own-premises'
    })

    const document = parseDocument(payload)
    expect(document.title).toBe(
      'Are you moving the cattle on or off your farm or premises?'
    )
    expect(statusCode).toBe(statusCodes.ok)
  })

  describe('Should process the result and provide expected response', () => {
    test('should redirect to cph number page', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin/to-or-from-own-premises',
          payload: {
            onOffFarm: 'off'
          }
        })
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe('/origin/cph-number')
    })

    test('should redirect to exit page', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin/to-or-from-own-premises',
          payload: {
            onOffFarm: 'on'
          }
        })
      )

      expect(headers.location).toBe('/exit-page')

      expect(statusCode).toBe(statusCodes.redirect)
    })
  })

  test('Should display an error to the user if no value selected', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/to-or-from-own-premises'
      })
    )

    expect(parseDocument(payload).title).toBe(
      'Error: Are you moving the cattle on or off your farm or premises?'
    )
    expect(payload).toEqual(expect.stringContaining('There is a problem'))

    expect(statusCode).toBe(statusCodes.ok)
  })

  test('should set the next page appropriately', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/origin/to-or-from-own-premises',
      headers: {
        referer: 'http://some.domain/origin/summary'
      }
    })

    const document = parseDocument(payload)
    expect(document.title).toBe(
      'Are you moving the cattle on or off your farm or premises?'
    )

    expect(payload).toEqual(
      expect.stringContaining(
        '<input type="hidden" name="nextPage" value="/origin/summary" />'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  test('should redirect to summary page if it came from there', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/to-or-from-own-premises',
        payload: {
          onOffFarm: 'off',
          nextPage: '/origin/summary'
        }
      })
    )

    expect(headers.location).toBe('/origin/summary')
    expect(statusCode).toBe(statusCodes.redirect)
  })

  testCsrfProtectedGet(() => server, {
    method: 'GET',
    url: '/origin/to-or-from-own-premises'
  })

  testCsrfProtectedPost(() => server, {
    method: 'POST',
    url: '/origin/to-or-from-own-premises',
    payload: {
      onOffFarm: 'on'
    }
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
