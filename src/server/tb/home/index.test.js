import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { config } from '~/src/config/config.js'
import SessionTestHelper from '~/src/server/common/test-helpers/session-helper.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { spyOnConfig } from '~/src/server/common/test-helpers/config.js'

const pageUrl = '/'

describe('HomePage', () => {
  /** @type {Server} */
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  beforeEach(async () => {
    session = await SessionTestHelper.create(server)
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: pageUrl
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(parseDocument(payload).title).toBe(config.get('serviceName'))
  })

  describe('content checks', () => {
    beforeEach(() => {
      spyOnConfig(
        'serviceName',
        'Get permission to move animals under disease controls'
      )
    })

    describe('when auth is enabled', () => {
      beforeEach(() => {
        spyOnConfig('featureFlags', {
          authEnabled: true,
          authRequired: true
        })
      })

      it('should match content', async () => {
        const { payload } = await server.inject(
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

        const content =
          parseDocument(payload).querySelector('#main-content')?.innerHTML

        expect(content).toMatchSnapshot()
      })
    })

    describe('when auth is disabled', () => {
      beforeEach(() => {
        spyOnConfig('featureFlags', {
          authEnabled: false
        })
      })

      it('should match content', async () => {
        const { payload } = await server.inject(
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

        const content =
          parseDocument(payload).querySelector('#main-content')?.innerHTML

        expect(content).toMatchSnapshot()
      })
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
