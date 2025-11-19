import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../../common/test-helpers/session-helper.js'
import { biosecuritySummaryPage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { keptSeparatelyPage } from '../kept-separately/index.js'
import { validBiosecuritySectionState } from '../../../common/test-helpers/journey-state.js'

const pageUrl = '/biosecurity/check-answers'

describe('#biosecuritySummaryPage', () => {
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
    await session.setSectionState('biosecurity', validBiosecuritySectionState)

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
    expect(statusCode).toBe(statusCodes.ok)
    expect(document.title).toBe(biosecuritySummaryPage.pageTitle)

    expect(payload).toEqual(
      expect.stringContaining('Manure and slurry is securely stored')
    )
  })

  it('should redirect user to kept separately page if they`ve not selected a value', async () => {
    await session.setSectionState('biosecurity', {
      ...validBiosecuritySectionState,
      keptSeparately: null
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
      `${keptSeparatelyPage.urlPath}?returnUrl=${biosecuritySummaryPage.urlPath}`
    )
  })
})

describePageSnapshot({
  describes: '#biosecuritySummaryPage.content',
  it: 'should render the expected content',
  pageUrl,
  state: {
    application: { biosecurity: validBiosecuritySectionState }
  }
})

/**
 * @import { Server } from '@hapi/hapi'
 */
