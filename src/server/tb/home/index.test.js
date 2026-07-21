import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { config } from '~/src/config/config.js'
import SessionTestHelper from '~/src/server/common/test-helpers/session-helper.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import {
  spyOnConfig,
  spyOnConfigMany
} from '~/src/server/common/test-helpers/config.js'

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
      spyOnConfig('serviceName', 'Move animals under disease controls')
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

  describe('domain-based redirect', () => {
    beforeEach(() => {
      spyOnConfigMany({
        'homepage.serviceGovUkDomain':
          'move-animals-under-disease-controls.service.gov.uk',
        'homepage.serviceGovUkRedirectUrl':
          'https://www.gov.uk/guidance/bovine-tb-move-animals-under-disease-controls'
      })
    })

    it('should redirect when domain matches', async () => {
      const response = await server.inject({
        method: 'GET',
        url: pageUrl,
        headers: {
          host: 'move-animals-under-disease-controls.service.gov.uk'
        }
      })

      expect(response.statusCode).toBe(statusCodes.redirect)
      expect(response.headers.location).toBe(
        'https://www.gov.uk/guidance/bovine-tb-move-animals-under-disease-controls'
      )
    })

    it('should show homepage when domain does not match', async () => {
      const response = await server.inject({
        method: 'GET',
        url: pageUrl,
        headers: {
          host: 'move-animals-under-disease-controls.defra.gov.uk'
        }
      })

      expect(response.statusCode).toBe(statusCodes.ok)
      expect(parseDocument(response.payload).title).toBe(
        config.get('serviceName')
      )
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
