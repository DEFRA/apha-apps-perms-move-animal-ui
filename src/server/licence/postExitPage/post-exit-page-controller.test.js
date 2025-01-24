import { emailAddressPage } from '../email-address/index.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import SessionTester from '~/src/server/common/test-helpers/session-helper.js'
import { receiveMethodPage } from '../receiveMethod/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

/** @import { Server } from '@hapi/hapi' */

const pageUrl =
  '/receiving-the-licence/licence-select-post-can-not-use-this-service'

describe('PostExitPageController', () => {
  /** @type {Server} */
  let server

  /** @type {SessionTester} */
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTester.create(server)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('Should process the result and provide expected response', () => {
    it('should redirect to next page, storing question state & preserving the rest of the section state', async () => {
      await session.setState(receiveMethodPage.sectionKey, {
        [receiveMethodPage.questionKey]: 'some-other-value'
      })
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: pageUrl,
            payload: {
              [receiveMethodPage.questionKey]: 'email'
            }
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(emailAddressPage.urlPath)

      const state = await session.getState(receiveMethodPage.sectionKey)
      expect(state[receiveMethodPage.questionKey]).toBe('email')
    })

    it('should redirect to email page', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: pageUrl
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(emailAddressPage.urlPath)
    })
  })

  describePageSnapshot({
    describes: 'PostExitPageController.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
