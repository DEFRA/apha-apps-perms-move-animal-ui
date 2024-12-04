import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

import { pageTitle } from './controller.js'
import SesessionTestHelper from '../../common/test-helpers/session-helper.js'

describe('#originSummaryController', () => {
  /** @type {Server} */
  let server

  /** @type {SesessionTestHelper} */
  let session

  const defaultState = {
    onOffFarm: 'off',
    cphNumber: '12/123/1234',
    address: {
      addressLine1: 'Starfleet Headquarters',
      addressLine2: '24-593 Federation Drive',
      addressTown: 'San Francisco',
      addressCounty: 'San Francisco',
      addressPostcode: 'RG24 8RR'
    }
  }

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SesessionTestHelper.create(server)

    await session.setState('origin', defaultState)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/origin/summary'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    expect(document.title).toBe(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)

    expect(payload).toEqual(expect.stringContaining('12/123/1234'))
    expect(payload).toEqual(expect.stringContaining('Off the farm or premises'))
    expect(payload).toEqual(
      expect.stringContaining(
        Object.values(defaultState.address).join('<br />')
      )
    )
  })

  describe('should redirect to specific page when fields are missing from state', () => {
    it('should not show on/off farm text', async () => {
      await session.setState('origin', {
        ...defaultState,
        onOffFarm: undefined
      })

      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/origin/summary'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(headers.location).toBe(
        '/origin/to-or-from-own-premises?redirect_uri=/origin/summary'
      )
      expect(statusCode).toBe(statusCodes.redirect)
    })

    it('should not show address text', async () => {
      await session.setState('origin', {
        ...defaultState,
        address: undefined
      })

      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/origin/summary'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(headers.location).toBe(
        '/origin/address?redirect_uri=/origin/summary'
      )
      expect(statusCode).toBe(statusCodes.redirect)
    })

    it('should not show cph number', async () => {
      await session.setState('origin', {
        ...defaultState,
        cphNumber: undefined
      })

      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/origin/summary'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(headers.location).toBe(
        '/origin/cph-number?redirect_uri=/origin/summary'
      )
      expect(statusCode).toBe(statusCodes.redirect)
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
