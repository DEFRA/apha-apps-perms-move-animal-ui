import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import SessionTester from '../../test-helpers/session-helper.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
import { ActionableExitPage } from '../../model/page/actionable-exit-page-model.js'
import { CphNumberAnswer } from '../../model/answer/cph-number/cph-number.js'
import { ActionableExitPageController } from './actionable-exit-page-controller.js'
import { StateManager } from '../../model/state/state-manager.js'

/** @import { Server } from '@hapi/hapi' */

const title = 'page title'
const heading = 'page heading'
const key = 'pageKey'
const sectionKey = 'sectionKey'
const pageView = 'common/controller/page-controller/page-controller.test.njk'
const pageUrl = '/test/basic-page'
const nextPageUrl = '/next-question-url'

class TestNextPage extends ExitPage {
  urlPath = nextPageUrl
}

class AnotherTestPage extends ExitPage {}
const testPage = new AnotherTestPage()

const testAnswer = new CphNumberAnswer()

class TestPage extends ActionableExitPage {
  urlPath = pageUrl
  pageTitle = title
  view = pageView
  key = key
  sectionKey = sectionKey
  pageHeading = heading

  nextPage() {
    return new TestNextPage()
  }

  viewProps() {
    return Promise.resolve({
      continueButtonText: 'Continue',
      continueButtonClasses: 'govuk-button--secondary'
    })
  }

  get indirectAction() {
    return {
      page: testPage,
      answer: testAnswer
    }
  }
}

const stateKey = 'test-state'

class TestStateManager extends StateManager {
  get key() {
    return stateKey
  }
}

class TestActionableExitPageController extends ActionableExitPageController {
  StateManager = TestStateManager
}

const controller = new TestActionableExitPageController(new TestPage(), {
  methods: ['GET', 'POST']
})

describe('ActionableExitPageController', () => {
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
    jest.restoreAllMocks()
  })

  describe('Should process the result and provide expected response', () => {
    it('should display the page', async () => {
      const { statusCode, payload } = await server.inject(
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
      expect(document.title).toBe(title)
      expect(document.querySelector('h1')?.textContent).toBe(heading)
    })

    it('should set status and redirect to next page', async () => {
      const setSpy = jest.spyOn(TestStateManager.prototype, 'set')

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

      expect(setSpy).toHaveBeenCalledWith(testPage, testAnswer)
      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(nextPageUrl)
    })
  })
})
