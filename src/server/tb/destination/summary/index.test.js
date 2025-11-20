import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import SessionTestHelper from '../../../common/test-helpers/session-helper.js'
import { destinationSummaryPage } from './index.js'
import { destinationTypePage } from '../destination-type/index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'

const pageUrl = '/destination/check-answers'

const defaultState = {
  destinationType: 'slaughter',
  additionalInfo: ''
}

describe('#destinationSummaryPage', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('other answer selected', () => {
    /** @type {SessionTestHelper} */
    let session

    const defaultState = {
      destinationType: 'other'
    }

    beforeEach(async () => {
      session = await SessionTestHelper.create(server)

      await session.setSectionState('destination', defaultState)
    })

    it('should redirect user to exit page if they`ve exited the journey', async () => {
      const { statusCode, headers } = await server.inject(
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

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(
        `${destinationTypePage.urlPath}?returnUrl=${destinationSummaryPage.urlPath}`
      )
    })
  })
})

describePageSnapshot({
  describes: '#destinationSummaryPage.content',
  it: 'should render the expected content',
  pageUrl,
  state: {
    application: { destination: defaultState }
  }
})

/**
 * @import { Server } from '@hapi/hapi'
 */
