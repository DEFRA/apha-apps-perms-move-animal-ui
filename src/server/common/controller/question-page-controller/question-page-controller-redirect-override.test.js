import { AnswerModel } from '../../model/answer/answer-model.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
import { QuestionPage } from '../../model/page/question-page-model.js'
import { createServer } from '~/src/server/index.js'
import SessionTester from '../../test-helpers/session-helper.js'
import { QuestionPageController } from './question-page-controller.js'
import { withCsrfProtection } from '../../test-helpers/csrf.js'
import { statusCodes } from '../../constants/status-codes.js'

/** @import { Server } from '@hapi/hapi' */

const questionUrl = '/dummy/question-url'
const nextQuestionUrl = '/dummy/next-question-url'
const overriddenQuestionUrl = '/dummy/overridden-question-url'

const sectionKey = 'dummy'
const questionKey = 'question'

class TestAnswer extends AnswerModel {
  toState() {
    return this._data?.questionKey
  }

  static fromState(state) {
    return new TestAnswer(
      state !== undefined ? { questionKey: state } : undefined
    )
  }

  get value() {
    return this._data?.[questionKey]
  }

  _extractFields(data) {
    return {
      [questionKey]: data[questionKey]
    }
  }

  validate() {
    return { isValid: true, errors: {} }
  }
}

class TestExitPage extends ExitPage {
  urlPath = '/exit'
}

class TestPage extends QuestionPage {
  question = 'dummy question'
  questionKey = questionKey
  view = 'some file'
  sectionKey = sectionKey
  urlPath = questionUrl

  Answer = TestAnswer

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    switch (_answer.value) {
      case 'exit':
        return new TestExitPage()
      case 'block-redirect':
        return new RedirectBlockPage()
      default:
        return new NextTestPage()
    }
  }
}

class NextTestPage extends TestPage {
  urlPath = nextQuestionUrl
}

class RedirectBlockPage extends TestPage {
  urlPath = overriddenQuestionUrl
  overrideRedirects = true
}

const controller = new QuestionPageController(new TestPage())

describe('#questionPageController ignore redirect', () => {
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

  it('should return the TestExitPage', () => {
    expect(
      controller.page.nextPage(new TestAnswer({ [questionKey]: 'exit' }))
    ).toBeInstanceOf(TestExitPage)
  })

  it('should return the NextTestPage', () => {
    expect(
      controller.page.nextPage(new TestAnswer({ [questionKey]: 'continue' }))
    ).toBeInstanceOf(NextTestPage)
  })

  it('should go to redirected page on post', async () => {
    const redirectUrl = '/dummy/incorrect-url'
    const { statusCode, headers } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: `${questionUrl}`,
          payload: { nextPage: redirectUrl }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).not.toBe(nextQuestionUrl)
    expect(headers.location).toBe(redirectUrl)
  })

  it('should not go to redirected page on post', async () => {
    await session.setState(sectionKey, { [questionKey]: 'block-redirect' })

    const redirectUrl = '/dummy/incorrect-url'
    const { statusCode, headers } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: `${questionUrl}`,
          payload: {
            nextPage: redirectUrl,
            [questionKey]: 'block-redirect'
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).not.toBe(redirectUrl)
    expect(headers.location).toBe(overriddenQuestionUrl)
  })
})
