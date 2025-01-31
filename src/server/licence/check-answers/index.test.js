import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { licenceSummaryPage } from './index.js'
import { receiveMethodPage } from '../receiveMethod/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const pageUrl = '/receiving-the-licence/check-answers'

const testName = 'test_name'
const testSurname = 'test_surname'
const emailMethod = 'email'
const postMethod = 'post'
const testEmail = 'test@email.com'

const defaultState = {
  fullName: {
    firstName: testName,
    lastName: testSurname
  },
  receiveMethod: emailMethod,
  emailAddress: testEmail
}

describe('#licenceSummaryPage', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('email method selected', () => {
    /** @type {SessionTestHelper} */
    let session

    beforeEach(async () => {
      session = await SessionTestHelper.create(server)

      await session.setState('licence', defaultState)
    })

    it('should render expected response', async () => {
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
      expect(document.title).toBe(licenceSummaryPage.pageTitle)
      expect(statusCode).toBe(statusCodes.ok)

      expect(payload).toEqual(
        expect.stringContaining(`${testName} ${testSurname}`)
      )
    })

    it('should redirect user to receive method page if they`ve selected Post', async () => {
      await session.setState('licence', {
        ...defaultState,
        receiveMethod: postMethod
      })

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
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(
        `${receiveMethodPage.urlPath}?redirect_uri=${licenceSummaryPage.urlPath}`
      )
    })
  })
})

describePageSnapshot({
  describes: '#licenceSummaryPage.content',
  it: 'should render the expected content',
  pageUrl
})

/**
 * @import { Server } from '@hapi/hapi'
 */
