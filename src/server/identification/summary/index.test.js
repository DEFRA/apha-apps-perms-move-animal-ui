import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { identificationSummaryPage } from './index.js'
import { validIdentificationSectionState } from '../../common/test-helpers/journey-state.js'

const pageUrl = '/identification/check-answers'

describe('#identificationSummaryPage', () => {
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

      await session.setSectionState(
        'identification',
        validIdentificationSectionState
      )
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
      expect(document.title).toBe(identificationSummaryPage.pageTitle)
      expect(statusCode).toBe(statusCodes.ok)

      expect(payload).toEqual(
        expect.stringContaining(validIdentificationSectionState.earTags)
      )
    })
  })
})

describePageSnapshot({
  describes: '#identificationSummaryPage.content',
  it: 'should render the expected content',
  pageUrl,
  state: { identification: validIdentificationSectionState }
})

/**
 * @import { Server } from '@hapi/hapi'
 */
