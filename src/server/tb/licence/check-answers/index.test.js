import { createServer } from '~/src/server/index.js'
import SessionTestHelper from '../../../common/test-helpers/session-helper.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { validLicenceSectionState } from '~/src/server/common/test-helpers/journey-state.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { licenceSummaryPage } from './index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
/** @import { Server } from '@hapi/hapi' */

const pageUrl = '/receiving-the-licence/check-answers'

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

  describe('valid state selected', () => {
    /** @type {SessionTestHelper} */
    let session

    beforeEach(async () => {
      session = await SessionTestHelper.create(server)

      await session.setSectionState('licence', validLicenceSectionState)
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
        expect.stringContaining(validLicenceSectionState.emailAddress)
      )
    })
  })
})

describePageSnapshot({
  describes: '#licenceSummaryPage.content',
  it: 'should render the expected content',
  pageUrl,
  state: {
    application: { licence: validLicenceSectionState }
  }
})
