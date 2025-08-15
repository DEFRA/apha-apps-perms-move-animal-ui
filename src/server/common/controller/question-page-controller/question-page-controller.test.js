import { QuestionPage } from '../../model/page/question-page-model.js'
import { TbQuestionPageController } from '../../../tb/question-page-controller.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTester from '../../test-helpers/session-helper.js'
import { AnswerModel } from '../../model/answer/answer-model.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
import { config } from '~/src/config/config.js'

/** @import { Server } from '@hapi/hapi' */

const question = 'question-text'
const questionKey = 'question-key'
const questionView =
  'common/controller/question-page-controller/question-page-controller.test.njk'
const sectionKey = 'section-key'
const questionUrl = '/question-url'
const nextQuestionUrl = '/next-question-url'
const nextOnFarmQuestionUrl = '/next-on-farm-question-url'
const overriddenQuestionUrl = '/dummy/overridden-question-url'
const questionValue = 'question-value'
const questionElementSelector = '#questionId'
const validationSpy = jest
  .spyOn(AnswerModel.prototype, 'validate')
  .mockReturnValue({ isValid: true, errors: {} })
const redirectUri = '/redirect-uri'
const mockHeaderFn = jest.fn()

const mockView = {
  header: mockHeaderFn
}

mockHeaderFn.mockReturnValue(mockView)

const testViewModel = {
  test: 'test content'
}

const TestAnswerSpy = jest.fn()

class TestAnswer extends AnswerModel {
  constructor(...args) {
    super(...args)
    TestAnswerSpy(...args)
  }

  toState() {
    return this._data?.[questionKey]
  }

  static fromState(state, context) {
    return new TestAnswer(
      state !== undefined ? { [questionKey]: state } : undefined,
      context
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
          [questionKey]: { text: 'There is a problem' }
        }
      }
    }

    return {
      isValid: true,
      errors: {
        [questionKey]: { text: 'There is no problem' }
      }
    }
  }

  async viewModel() {
    return Promise.resolve(testViewModel)
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

  nextPage(answer, state) {
    if (state?.origin?.onOffFarm === 'on') {
      return new NextOnFarmTestPage()
    }
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

class NextOnFarmTestPage extends TestPage {
  urlPath = nextOnFarmQuestionUrl
}

const controller = new TbQuestionPageController(new TestPage())

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

  it('should take the plugin name from the section and class name of the page', () => {
    expect(/** @type {any} */ (controller.plugin()).plugin.name).toBe(
      `${controller.StateManager.key}-${sectionKey}-TestPage`
    )
  })

  describe('GET', () => {
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
      await session.setSectionState(sectionKey, {
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

    it('should be able to depend on the previous application state', async () => {
      const originState = {
        onOffFarm: 'on'
      }
      await session.setSectionState(sectionKey, {
        [questionKey]: questionValue
      })
      await session.setSectionState('origin', originState)

      jest.spyOn(TestAnswer, 'fromState')
      await server.inject(
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

      expect(TestAnswer.fromState).toHaveBeenCalledWith(questionValue, {
        origin: originState,
        [sectionKey]: { [questionKey]: questionValue }
      })
    })
  })

  describe('POST', () => {
    it('should redirect to next page, storing question state & preserving the rest of the section state', async () => {
      await session.setSectionState(sectionKey, {
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

      const state = await session.getSectionState(sectionKey)
      expect(state[questionKey]).toBe(questionValue)
      expect(state.someOtherQuestion).toBe('some-other-answer')
    })

    it('should allow routing to depend on application state', async () => {
      await session.setSectionState('origin', {
        onOffFarm: 'on'
      })
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: questionUrl,
            payload: {
              [questionKey]: 'exit'
            }
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(nextOnFarmQuestionUrl)
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

      const state = await session.getSectionState(sectionKey)
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
        withCsrfProtection(
          {
            method: 'POST',
            url: questionUrl,
            payload: {
              [questionKey]: questionValue,
              nextPage: redirectUri
            }
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(redirectUri)
    })

    describe('when the answer is invalid', () => {
      beforeEach(() => {
        validationSpy.mockReturnValue({ isValid: false, errors: {} })
      })

      it('should display an error to the user if answer is invalid, preserving redirect_uri', async () => {
        const errorValue = 'ERROR'
        const questionUrlWithRedirectUri = `${questionUrl}?redirect_uri=/next/page`
        const { headers, statusCode } = await server.inject(
          withCsrfProtection(
            {
              method: 'POST',
              url: questionUrlWithRedirectUri,
              payload: {
                [questionKey]: errorValue
              }
            },
            {
              Cookie: session.sessionID
            }
          )
        )

        expect(statusCode).toBe(statusCodes.redirect)
        expect(headers.location).toBe(questionUrlWithRedirectUri)

        const erroredGET = await server.inject(
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

        const erroredDocument = parseDocument(erroredGET.payload)
        const input = erroredDocument.querySelector(
          `input[name="questionName"]`
        )

        expect(erroredGET.statusCode).toBe(statusCodes.ok)
        expect(erroredDocument.title).toBe(`Error: ${question}`)
        expect(input?.getAttribute('value')).toBe(errorValue)
      })

      it('should clear the session state *for this question only* if the user encounters an error', async () => {
        await session.setSectionState(sectionKey, {
          [questionKey]: questionValue,
          someOtherQuestion: 'some-other-answer'
        })

        const { statusCode } = await server.inject(
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

        expect(statusCode).toBe(statusCodes.redirect)

        const state = await session.getSectionState(sectionKey)
        expect(state[questionKey]).toBeUndefined()
        expect(state.someOtherQuestion).toBe('some-other-answer')
      })

      it('Should display an error and set next page appropriately', async () => {
        const errorHandlerSpy = jest.spyOn(controller, 'recordErrors')

        const { headers, statusCode } = await server.inject(
          withCsrfProtection({
            method: 'POST',
            url: questionUrl,
            payload: {
              nextPage: redirectUri
            }
          })
        )

        expect(statusCode).toBe(statusCodes.redirect)
        expect(headers.location).toBe(questionUrl)

        expect(errorHandlerSpy).toHaveBeenCalledWith({
          [questionKey]: { text: 'There is a problem' }
        })
      })

      describe('custom logging', () => {
        beforeAll(() => {
          config.set('isProduction', true)
        })

        it('Should report errors appropriately', async () => {
          const errorHandlerSpy = jest.spyOn(controller, 'recordErrors')

          const { headers, statusCode } = await server.inject(
            withCsrfProtection({
              method: 'POST',
              url: questionUrl,
              payload: {
                nextPage: redirectUri
              }
            })
          )

          expect(statusCode).toBe(statusCodes.redirect)
          expect(headers.location).toBe(questionUrl)
          expect(errorHandlerSpy).toHaveBeenCalledWith({
            [questionKey]: { text: 'There is a problem' }
          })
        })

        afterAll(() => {
          config.set('isProduction', false)
        })
      })
    })

    it('should pass context to the answer model', async () => {
      const originState = {
        originType: 'afu'
      }
      await session.setSectionState(sectionKey, {
        [questionKey]: questionValue
      })
      await session.setSectionState('origin', originState)

      const payload = {
        [questionKey]: 'continue'
      }

      await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: `${questionUrl}`,
            payload
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(TestAnswerSpy).toHaveBeenCalledWith(payload, {
        origin: originState,
        [sectionKey]: { [questionKey]: questionValue }
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
      await session.setSectionState(sectionKey, {
        [questionKey]: 'block-redirect'
      })

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

    it('should add a query string onto tthe overriden url', async () => {
      await session.setSectionState(sectionKey, {
        [questionKey]: 'block-redirect'
      })

      const redirectUrl = '/dummy/incorrect-url'
      const { statusCode, headers } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: `${questionUrl}?redirect=true`,
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
      expect(headers.location).toBe(`${overriddenQuestionUrl}?redirect=true`)
    })
  })

  describe('View render', () => {
    const h = {
      view: jest.fn().mockImplementation(() => {
        return mockView
      }),
      redirect: jest.fn()
    }
    const request = {
      yar: {
        get: jest.fn(),
        set: jest.fn(),
        clear: jest.fn()
      },
      query: {
        redirect_uri: 'redirect_uri'
      }
    }

    it('GET should render view with expected arguments', async () => {
      const result = await controller.getHandler(request, h)

      expect(h.view).toHaveBeenCalledTimes(1)
      expect(h.view).toHaveBeenCalledWith(
        questionView,
        expect.objectContaining({
          heading: question,
          nextPage: 'redirect_uri',
          pageTitle: question,
          value: undefined,
          answerViewModel: testViewModel
        })
      )

      const viewArgs = h.view.mock.calls[0][1]
      expect(viewArgs.answer).toBeInstanceOf(TestAnswer)

      expect(result).toBe(mockView)
    })

    it('GET should render when erroring with expected arguments', async () => {
      const errorState = {
        errorMessages: [
          { href: `#${questionKey}`, text: 'There is a problem' }
        ],
        errors: {
          [questionKey]: { text: 'There is a problem' }
        },
        payload: { [questionKey]: 'ERROR' }
      }

      request.yar.get.mockImplementation((name) =>
        name === `errors:${sectionKey}:${questionKey}` ? errorState : undefined
      )
      const result = await controller.getHandler(request, h)

      expect(h.view).toHaveBeenCalledTimes(1)
      expect(h.view).toHaveBeenCalledWith(
        questionView,
        expect.objectContaining({
          heading: question,
          nextPage: 'redirect_uri',
          pageTitle: `Error: ${question}`,
          errorMessages: errorState.errorMessages,
          errors: errorState.errors,
          answerViewModel: testViewModel
        })
      )

      const viewArgs = h.view.mock.calls[0][1]
      expect(viewArgs.answer).toBeInstanceOf(TestAnswer)

      expect(result).toBe(mockView)
    })

    it('POST should render view with expected arguments', () => {
      const payload = {
        nextPage: 'test_next_page',
        [questionKey]: 'ERROR'
      }
      const postRequest = {
        ...request,
        payload
      }

      controller.postHandler(postRequest, h)

      expect(h.redirect).toHaveBeenCalledTimes(1)
      expect(request.yar.clear).toHaveBeenCalledTimes(1)
      expect(request.yar.clear).toHaveBeenCalledWith(
        `errors:${sectionKey}:${questionKey}`
      )
      expect(request.yar.set.mock.calls[1]).toStrictEqual([
        `errors:${sectionKey}:${questionKey}`,
        {
          errorMessages: [
            { href: `#${questionKey}`, text: 'There is a problem' }
          ],
          errors: {
            [questionKey]: { text: 'There is a problem' }
          },
          payload
        }
      ])
    })
  })
})
