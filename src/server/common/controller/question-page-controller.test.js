import { QuestionPage } from '../model/page/question-page-model.js'
import { QuestionPageController } from './question-page-controller.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import {
  testCsrfProtectedGet,
  testCsrfProtectedPost,
  withCsrfProtection
} from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTester from '../../common/test-helpers/session-helper.js'
import { Page } from '../model/page/page-model.js'
import { OnOffFarm } from '../model/answer/on-off-farm.js'

/** @import { Server } from '@hapi/hapi' */

class CphNumberPage extends Page {
  urlPath = '/origin-test/cph-number'
}

class ExitPage extends Page {
  urlPath = '/exit-page'
}

const question = 'Are you moving the cattle on or off your farm or premises?'

class TestOnOffPage extends QuestionPage {
  question = question
  questionKey = 'onOffFarm'
  view = 'common/controller/question-page-controller.test.njk'
  sectionKey = 'origin-test'
  urlPath = '/origin-test/to-or-from-own-premises'

  Answer = OnOffFarm

  /**
   * @param {OnOffFarm} answer
   */
  nextPage(answer) {
    if (answer.value === 'on') {
      return new ExitPage()
    } else {
      return new CphNumberPage()
    }
  }
}

const controller = new QuestionPageController(new TestOnOffPage())

describe('QuestionPageController', () => {
  /** @type {Server} */
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.register(controller.plugin())
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTester.create(server)
    await session.setState('origin-test', {
      onOffFarm: 'off'
    })
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/origin-test/to-or-from-own-premises'
    })

    const document = parseDocument(payload)
    expect(document.title).toBe(
      'Are you moving the cattle on or off your farm or premises?'
    )
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should repopulate the form from state', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/origin-test/to-or-from-own-premises'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)

    expect(
      /** @type {any} */ (document.querySelector('#off-farm-radio'))?.checked
    ).toBe(true)

    expect(statusCode).toBe(statusCodes.ok)
  })

  describe('Should process the result and provide expected response', () => {
    it('should redirect to cph number page', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin-test/to-or-from-own-premises',
          payload: {
            onOffFarm: 'off'
          }
        })
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe('/origin-test/cph-number')
    })

    it('should redirect to exit page', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin-test/to-or-from-own-premises',
          payload: {
            onOffFarm: 'on'
          }
        })
      )

      expect(headers.location).toBe('/exit-page')

      expect(statusCode).toBe(statusCodes.redirect)
    })
  })

  it('Should display an error to the user if no value selected', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin-test/to-or-from-own-premises'
      })
    )

    expect(parseDocument(payload).title).toBe(
      'Error: Are you moving the cattle on or off your farm or premises?'
    )
    expect(payload).toEqual(expect.stringContaining('There is a problem'))

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should set the next page appropriately', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/origin-test/to-or-from-own-premises?redirect_uri=/origin/summary'
    })

    const document = parseDocument(payload)
    expect(document.title).toBe(
      'Are you moving the cattle on or off your farm or premises?'
    )

    expect(payload).toEqual(
      expect.stringContaining(
        '<input type="hidden" name="nextPage" value="/origin/summary" />'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should redirect to summary page if it came from there', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin-test/to-or-from-own-premises',
        payload: {
          onOffFarm: 'off',
          nextPage: '/origin/summary'
        }
      })
    )

    expect(headers.location).toBe('/origin/summary')
    expect(statusCode).toBe(statusCodes.redirect)
  })

  testCsrfProtectedGet(() => server, {
    method: 'GET',
    url: '/origin-test/to-or-from-own-premises'
  })

  testCsrfProtectedPost(() => server, {
    method: 'POST',
    url: '/origin-test/to-or-from-own-premises',
    payload: {
      onOffFarm: 'on'
    }
  })
})
