import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { identificationSummaryPage } from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { earTagsPage } from '../ear-tags/index.js'

/** @import { Server } from '@hapi/hapi' */

const pageUrl = '/identification/check-answers'

const defaultState = {
  earTags: `ear-tag-state`
}

describe('IdentificationSummaryPage', () => {
  /** @type {Server} */
  let server
  /** @type {SessionTestHelper} */
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
    session = await SessionTestHelper.create(server)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('should render expected response when default state present', async () => {
    await session.setState('identification', defaultState)

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
  })

  it('should redirect user to kept separately page if they`ve not selected a value', async () => {
    await session.setState('identification', {
      ...defaultState,
      earTags: null
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
      `${earTagsPage.urlPath}?redirect_uri=${identificationSummaryPage.urlPath}`
    )
  })
})

describePageSnapshot({
  describes: '#IdentificationSummaryPage.content',
  it: 'should render the expected content',
  pageUrl,
  state: { identification: defaultState }
})
