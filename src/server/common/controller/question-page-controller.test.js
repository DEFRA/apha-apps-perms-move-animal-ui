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

  it('should provide a blank question page on a GET without any session state', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/origin-test/to-or-from-own-premises'
    })

    const document = parseDocument(payload)
    expect(document.title).toBe(question)
    expect(statusCode).toBe(statusCodes.ok)
    expect(
      /** @type {HTMLInputElement} */ (
        document.querySelector('#off-farm-radio')
      )?.checked
    ).toBe(false)
    expect(
      /** @type {HTMLInputElement} */ (document.querySelector('#on-farm-radio'))
        ?.checked
    ).toBe(false)
  })

  it('should repopulate the form from state', async () => {
    await session.setState('origin-test', {
      onOffFarm: 'off'
    })
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
      /** @type {HTMLInputElement} */ (
        document.querySelector('#off-farm-radio')
      )?.checked
    ).toBe(true)
    expect(
      /** @type {HTMLInputElement} */ (document.querySelector('#on-farm-radio'))
        ?.checked
    ).toBe(false)

    expect(statusCode).toBe(statusCodes.ok)
  })

  describe('Should process the result and provide expected response', () => {
    it('should redirect to cph number page, storing question state & preserving the rest of the section state', async () => {
      await session.setState('origin-test', {
        someOtherQuestion: 'some-other-answer'
      })
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: '/origin-test/to-or-from-own-premises',
            payload: {
              onOffFarm: 'off'
            }
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe('/origin-test/cph-number')

      const state = await session.getState('origin-test')
      expect(state.onOffFarm).toBe('off')
      expect(state.someOtherQuestion).toBe('some-other-answer')
    })

    it('should redirect to exit page, storing question state & preserving the rest of the section state', async () => {
      await session.setState('origin-test', {
        someOtherQuestion: 'some-other-answer'
      })
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: '/origin-test/to-or-from-own-premises',
            payload: {
              onOffFarm: 'on'
            }
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(headers.location).toBe('/exit-page')

      const state = await session.getState('origin-test')
      expect(state.onOffFarm).toBe('on')
      expect(state.someOtherQuestion).toBe('some-other-answer')
      expect(statusCode).toBe(statusCodes.redirect)
    })
  })

  it('should display an error to the user if no value selected', async () => {
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
    const document = parseDocument(payload)

    expect(
      /** @type {HTMLInputElement} */ (
        document.querySelector('#off-farm-radio')
      )?.checked
    ).toBe(false)
    expect(
      /** @type {HTMLInputElement} */ (document.querySelector('#on-farm-radio'))
        ?.checked
    ).toBe(false)

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should clear the session state *for this question only* if the user encounters an error', async () => {
    await session.setState('origin-test', {
      onOffFarm: 'off',
      someOtherQuestion: 'some-other-answer'
    })
    const { payload } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: '/origin-test/to-or-from-own-premises'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(parseDocument(payload).title).toBe(
      'Error: Are you moving the cattle on or off your farm or premises?'
    )

    const state = await session.getState('origin-test')
    expect(state.onOffFarm).toBeUndefined()
    expect(state.someOtherQuestion).toBe('some-other-answer')
  })

  it('should set the next page to redirect_uri if one exists', async () => {
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

  test('Should display an error and set next page appropriately', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin-test/to-or-from-own-premises',
        payload: {
          onOffFarm: 'invalid format',
          nextPage: '/origin/summary'
        }
      })
    )

    expect(parseDocument(payload).title).toBe(
      'Error: Are you moving the cattle on or off your farm or premises?'
    )
    expect(payload).toEqual(
      expect.stringContaining(
        '<input type="hidden" name="nextPage" value="/origin/summary" />'
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should redirect to whatever the redirect_uri specified, rather than next page', async () => {
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
