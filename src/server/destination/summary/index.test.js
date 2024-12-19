import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SesessionTestHelper from '../../common/test-helpers/session-helper.js'
import { destinationSummaryPage } from './index.js'

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
    /** @type {SesessionTestHelper} */
    let session

    const defaultState = {
      destinationType: 'slaughter'
    }

    beforeEach(async () => {
      session = await SesessionTestHelper.create(server)

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
    /** @type {SesessionTestHelper} */
    let session

    const defaultState = {
      destinationType: 'other'
    }

    beforeEach(async () => {
      session = await SesessionTestHelper.create(server)

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

      expect(payload).toEqual(expect.stringContaining('Another destination'))
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
