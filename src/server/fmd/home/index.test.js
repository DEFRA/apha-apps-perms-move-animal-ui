import { homePage } from './index.js'
import { spyOnConfig } from '../../common/test-helpers/config.js'
import { withCsrfProtection } from '../../common/test-helpers/csrf.js'
import { parseDocument } from '../../common/test-helpers/dom.js'
import { createServer } from '~/src/server/index.js'
import SessionTestHelper from '~/src/server/common/test-helpers/session-helper.js'

/** @import { Server } from '@hapi/hapi' */

const pageUrl = '/fmd'

describe('HomePage', () => {
  const page = homePage

  it('should have the right key', () => {
    expect(page.key).toBe('home')
  })

  it('should have the right section key', () => {
    expect(page.sectionKey).toBe('fmd')
  })

  it('should have the right view', () => {
    expect(page.view).toBe('fmd/home/index.njk')
  })

  it('should have the right url', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the right page title', () => {
    expect(page.pageTitle).toBe('Move animals under disease controls')
  })

  it('should have the right heading', () => {
    expect(page.heading).toBe('Move animals under disease controls')
  })

  describe('HomePage content checks', () => {
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
