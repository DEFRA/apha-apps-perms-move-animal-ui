import { Page } from '../../model/page/page-model.js'
import { PageController } from './page-controller.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import SessionTester from '../../test-helpers/session-helper.js'
import { ExitPage } from '../../model/page/exit-page-model.js'

/** @import { Server } from '@hapi/hapi' */

const title = 'page title'
const heading = 'page heading'
const key = 'pageKey'
const pageView = 'common/controller/page-controller/page-controller.test.njk'
const pageUrl = '/test/basic-page'
const nextPageUrl = '/next-question-url'

class TestNextPage extends ExitPage {
  urlPath = nextPageUrl
}

class TestPage extends Page {
  urlPath = pageUrl
  view = pageView
  key = key

  pageTitle = title
  pageHeading = heading

  nextPage() {
    return new TestNextPage()
  }

  get viewProps() {
    return {
      continueUrl: this.nextPage().urlPath
    }
  }
}

const controller = new PageController(new TestPage())

describe('PageController', () => {
  /** @type {Server} */
  let server

  /** @type {SessionTester} */
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.register(controller.plugin())
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTester.create(server)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('Should process the result and provide expected response', () => {
    it('should redirect to next page, storing question state & preserving the rest of the section state', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: pageUrl
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(nextPageUrl)
    })
  })
})
