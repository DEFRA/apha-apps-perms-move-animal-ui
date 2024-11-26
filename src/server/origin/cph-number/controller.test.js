import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { pageTitle } from './controller.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

describe('#cphNumber', () => {
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
      url: '/origin/cph-number'
    })

    expect(parseDocument(payload).title).toEqual(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should process the result and provide expected response', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/cph-number',
        payload: {
          cphNumber: '12/456/7899'
        }
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)

    expect(headers.location).toBe('/origin/address')
  })

  test('Should display an error to the user if no value entered', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/cph-number',
        payload: {}
      })
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

    expect(payload).toEqual(expect.stringContaining('There is a problem'))
    expect(payload).toEqual(
      expect.stringContaining('Enter the farm or premises CPH number')
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should display an error to the user entered malformed CPH', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/cph-number',
        payload: {
          cphNumber: 'invalid format'
        }
      })
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

    expect(payload).toEqual(expect.stringContaining('There is a problem'))
    expect(payload).toEqual(
      expect.stringContaining(
        'Enter the CPH number in the correct format, for example, 12/345/6789'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  describe('when nextPage is provided', () => {
    test('should set the next page appropriately', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: '/origin/cph-number?redirect_uri=/origin/summary'
      })

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
          url: '/origin/cph-number',
          payload: {
            cphNumber: '12/123/1234',
            nextPage: '/origin/summary'
          }
        })
      )

      expect(headers.location).toBe('/origin/summary')
      expect(statusCode).toBe(statusCodes.redirect)
    })

    test('Should display an error and set next page appropriately', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin/cph-number',
          payload: {
            cphNumber: 'invalid format',
            nextPage: '/origin/summary'
          }
        })
      )

      expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
      expect(payload).toEqual(
        expect.stringContaining(
          '<input type="hidden" name="nextPage" value="/origin/summary" />'
        )
      )

      expect(statusCode).toBe(statusCodes.ok)
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
