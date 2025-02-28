import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

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

    const { statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.notFound)
  })

  it('should redirect user to kept separately page if they`ve not selected a value', async () => {
    await session.setState('identification', {
      ...defaultState,
      earTags: null
    })

    const { statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.notFound)
  })
})

describePageSnapshot({
  describes: '#IdentificationSummaryPage.content',
  it: 'should render the expected content',
  pageUrl,
  state: { identification: defaultState }
})
