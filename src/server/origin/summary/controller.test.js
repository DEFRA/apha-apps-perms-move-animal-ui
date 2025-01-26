import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { originSummaryPage } from './index.js'

const pageUrl = '/origin/check-answers'

describe('#originSummaryController', () => {
  /** @type {Server} */
  let server

  /** @type {SessionTestHelper} */
  let session

  const defaultState = {
    onOffFarm: 'off',
    originType: 'afu',
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
    session = await SessionTestHelper.create(server)

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
          url: pageUrl
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    expect(document.title).toBe(originSummaryPage.pageTitle)
    expect(statusCode).toBe(statusCodes.ok)

    expect(payload).toEqual(expect.stringContaining('12/123/1234'))
    expect(payload).toEqual(
      expect.stringContaining('Approved finishing unit (AFU)')
    )
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
            url: pageUrl
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(headers.location).toBe(
        '/origin/to-or-from-own-premises?redirect_uri=/origin/check-answers'
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
            url: pageUrl
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(headers.location).toBe(
        '/origin/address?redirect_uri=/origin/check-answers'
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
            url: pageUrl
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(headers.location).toBe(
        '/origin/cph-number?redirect_uri=/origin/check-answers'
      )
      expect(statusCode).toBe(statusCodes.redirect)
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
