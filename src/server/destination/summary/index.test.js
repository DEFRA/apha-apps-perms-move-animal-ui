import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { destinationSummaryPage } from './index.js'
import { destinationTypePage } from '../destination-type/index.js'

describe('#destinationSummaryController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('slaughter answer selected', () => {
    /** @type {SessionTestHelper} */
    let session

    const defaultState = {
      destinationType: 'slaughter'
    }

    beforeEach(async () => {
      session = await SessionTestHelper.create(server)

      await session.setState('destination', defaultState)
    })

    it('should render expected response', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/destination/check-answers'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      const document = parseDocument(payload)
      expect(document.title).toBe(destinationSummaryPage.pageTitle)
      expect(statusCode).toBe(statusCodes.ok)

      expect(payload).toEqual(expect.stringContaining('Slaughter'))
    })
  })

  describe('other answer selected', () => {
    /** @type {SessionTestHelper} */
    let session

    const defaultState = {
      destinationType: 'other'
    }

    beforeEach(async () => {
      session = await SessionTestHelper.create(server)

      await session.setState('destination', defaultState)
    })

    it('should redirect user to exit page if they`ve exited the journey', async () => {
      const { statusCode, headers } = await server.inject(
        withCsrfProtection(
          {
            method: 'GET',
            url: '/destination/check-answers'
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(
        `${destinationTypePage.urlPath}?redirect_uri=${destinationSummaryPage.urlPath}`
      )
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
