import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { config } from '~/src/config/config.js'
import SessionTestHelper from '../common/test-helpers/session-helper.js'
import { withCsrfProtection } from '../common/test-helpers/csrf.js'

const pageUrl = '/'

describe('#homeController', () => {
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

  describe('v1', () => {
    it('should match v1 content', async () => {
      const featureFlags = {
        ...config.get('featureFlags'),
        biosecurity: false
      }
      jest.spyOn(config, 'get').mockImplementation((name) => {
        if (name === 'featureFlags') {
          return featureFlags
        } else {
          return 'Get permission to move animals under disease controls'
        }
      })

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

  describe('v2', () => {
    it('should match v2 content', async () => {
      const featureFlags = {
        ...config.get('featureFlags'),
        biosecurity: true
      }

      jest.spyOn(config, 'get').mockImplementation((name) => {
        if (name === 'featureFlags') {
          return featureFlags
        } else {
          return 'Get permission to move animals under disease controls'
        }
      })

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

/**
 * @import { Server } from '@hapi/hapi'
 */
