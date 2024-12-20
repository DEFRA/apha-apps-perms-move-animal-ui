import { QuestionPage } from '../../model/page/question-page-model.js'
import { QuestionPageController } from './question-page-controller.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTester from '../../test-helpers/session-helper.js'
import { AnswerModel } from '../../model/answer/answer-model.js'
import { ExitPage } from '../../model/page/exit-page-model.js'

/** @import { Server } from '@hapi/hapi' */

const question = 'question-text'
const questionKey = 'questionKey'
const questionView =
  'common/controller/question-page-controller/question-page-controller.test.njk'
const sectionKey = 'section-key'
const questionUrl = '/question-url'
const nextQuestionUrl = '/next-question-url'
const overriddenQuestionUrl = '/dummy/overridden-question-url'
const questionValue = 'question-value'
const questionElementSelector = '#questionId'
const validationSpy = jest
  .spyOn(AnswerModel.prototype, 'validate')
  .mockReturnValue({ isValid: true, errors: {} })
const redirectUri = '/redirect-uri'

class TestAnswer extends AnswerModel {
  toState() {
    return this._data?.[questionKey]
  }

  static fromState(state) {
    return new TestAnswer(
      state !== undefined ? { [questionKey]: state } : undefined
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
    if (!this.value || this.value?.includes('ERROR')) {
      return {
        isValid: false,
        errors: {
          questionKey: { text: 'There is a problem' }
        }
      }
    }

    return {
      isValid: true,
      errors: {
        questionKey: { text: 'There is no problem' }
      }
    }
  }
}

class TestExitPage extends ExitPage {
  urlPath = '/exit'
}

class TestPage extends QuestionPage {
  question = question
  questionKey = questionKey
  view = questionView
  sectionKey = sectionKey
  urlPath = questionUrl

  Answer = TestAnswer

  nextPage(answer) {
    switch (answer.value) {
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

  it('should provide the question page on a GET without any session state', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: questionUrl
    })

    const document = parseDocument(payload)
    expect(document.title).toBe(question)
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should repopulate the form from state', async () => {
    await session.setState(sectionKey, {
      [questionKey]: questionValue
    })
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: questionUrl
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    expect(
      /** @type {HTMLInputElement} */ (
        document.querySelector(questionElementSelector)
      )?.value
    ).toBe(questionValue)

    expect(statusCode).toBe(statusCodes.ok)
  })

  describe('Should process the result and provide expected response', () => {
    it('should redirect to next page, storing question state & preserving the rest of the section state', async () => {
      await session.setState(sectionKey, {
        someOtherQuestion: 'some-other-answer'
      })
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: questionUrl,
            payload: {
              [questionKey]: questionValue
            }
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(nextQuestionUrl)

      const state = await session.getState(sectionKey)
      expect(state[questionKey]).toBe(questionValue)
      expect(state.someOtherQuestion).toBe('some-other-answer')
    })

    it('should redirect to exit page even if redirect uri is set', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: questionUrl,
            payload: {
              [questionKey]: 'exit',
              nextPage: redirectUri
            }
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe('/exit')

      const state = await session.getState(sectionKey)
      expect(state[questionKey]).toBe('exit')
    })

    it('should set the next page to redirect_uri if one exists', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: `${questionUrl}?redirect_uri=${redirectUri}`
      })

      const document = parseDocument(payload)
      expect(document.title).toBe(question)

      expect(payload).toEqual(
        expect.stringContaining(
          `<input type="hidden" name="nextPage" value="${redirectUri}" />`
        )
      )

      expect(statusCode).toBe(statusCodes.ok)
    })

    it('should redirect to whatever the redirect_uri specified, rather than next page', async () => {
      const { headers, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: questionUrl,
          payload: {
            [questionKey]: questionValue,
            nextPage: redirectUri
          }
        })
      )

      expect(headers.location).toBe(redirectUri)
      expect(statusCode).toBe(statusCodes.redirect)
    })

    describe('when the answer is invalid', () => {
      beforeEach(() => {
        validationSpy.mockReturnValue({ isValid: false, errors: {} })
      })

      it('should display an error to the user if answer is invalid', async () => {
        const { payload, statusCode } = await server.inject(
          withCsrfProtection({
            method: 'POST',
            url: questionUrl
          })
        )

        const document = parseDocument(payload)
        expect(document.title).toBe(`Error: ${question}`)
        expect(payload).toEqual(expect.stringContaining('There is a problem'))
        expect(
          /** @type {HTMLInputElement} */ (
            document.querySelector(questionElementSelector)
          )?.value
        ).toBe('')

        expect(statusCode).toBe(statusCodes.ok)
      })

      it('should clear the session state *for this question only* if the user encounters an error', async () => {
        await session.setState(sectionKey, {
          [questionKey]: questionValue,
          someOtherQuestion: 'some-other-answer'
        })
        const { payload } = await server.inject(
          withCsrfProtection(
            {
              method: 'POST',
              url: questionUrl
            },
            {
              Cookie: session.sessionID
            }
          )
        )

        const document = parseDocument(payload)
        expect(document.title).toBe(`Error: ${question}`)

        const state = await session.getState(sectionKey)
        expect(state[questionKey]).toBeUndefined()
        expect(state.someOtherQuestion).toBe('some-other-answer')
      })

      it('Should display an error and set next page appropriately', async () => {
        const { payload, statusCode } = await server.inject(
          withCsrfProtection({
            method: 'POST',
            url: questionUrl,
            payload: {
              nextPage: redirectUri
            }
          })
        )

        expect(parseDocument(payload).title).toBe(`Error: ${question}`)
        expect(payload).toEqual(
          expect.stringContaining(
            `<input type="hidden" name="nextPage" value="${redirectUri}" />`
          )
        )

        expect(statusCode).toBe(statusCodes.ok)
      })
    })
  })

  describe('next page tests', () => {
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
            payload: {
              nextPage: redirectUrl,
              [questionKey]: 'continue'
            }
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
})
