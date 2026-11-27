import { QuestionPage } from '../../model/page/question-page-model.js'
import { TbQuestionPageController } from '../../../tb/question-page-controller.js'
import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import {
  expectValidationError,
  parseDocument
} from '~/src/server/common/test-helpers/dom.js'
import SessionTester from '../../test-helpers/session-helper.js'
import { AnswerModel } from '../../model/answer/answer-model.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
import { config } from '~/src/config/config.js'

/** @import { Server } from '@hapi/hapi' */
/** @import { AnswerViewModelOptions } from '~/src/server/common/model/answer/answer-model.js' */

jest.mock('../../helpers/i18n/index.js', () => {
  const actual = jest.requireActual('../../helpers/i18n/index.js')

  return {
    ...actual,
    translate: jest.fn((request, key, fallback, params) =>
      key === 'question-i18n-key'
        ? 'Translated question'
        : actual.translate(request, key, fallback, params)
    )
  }
})

const question = 'question-text'
const questionKey = 'question-key'
const questionI18nKey = 'question-i18n-key'
const translatedQuestion = 'Translated question'
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

  /** @param {AnswerViewModelOptions['translate']} [translate] */
  validate(translate) {
    if (!this.value || this.value?.includes('ERROR')) {
      return {
        isValid: false,
        errors: {
          [questionKey]: {
            text:
              translate?.(undefined, 'There is a problem') ??
              'There is a problem'
          }
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
  questionI18nKey = questionI18nKey
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
    it('updates the summary and inline error for a real number question after a language switch', async () => {
      const url = '/destination/how-many-animals'
      const headers = { Cookie: session.sessionID }
      const post = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: `${url}?lang=en`,
            payload: { howManyAnimals: '0' }
          },
          headers
        )
      )
      expect(post.statusCode).toBe(statusCodes.redirect)
      const response = await server.inject(
        withCsrfProtection({ method: 'GET', url: `${url}?lang=cy` }, headers)
      )
      expect(response.statusCode).toBe(statusCodes.ok)
      const document = parseDocument(response.payload)
      expectValidationError(document, {
        message: 'Nodwch rif 1 neu uwch',
        href: '#howManyAnimals',
        input: { selector: '#howManyAnimals', value: '0' }
      })
    })

    it('revalidates stored local errors in the requested language', async () => {
      const validateSpy = jest
        .spyOn(TestAnswer.prototype, 'validate')
        .mockImplementation((translate) => {
          if (!translate) {
            throw new Error('Expected a request-bound translator')
          }
          return {
            isValid: false,
            errors: {
              [questionKey]: {
                text: translate(
                  'common.answer.number.validation.base',
                  'Enter a number'
                )
              }
            }
          }
        })
      const externalSpy = jest.spyOn(TestAnswer.prototype, 'validateExternally')
      const response = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: `${questionUrl}?lang=en`,
            payload: { [questionKey]: 'ERROR' }
          },
          { Cookie: session.sessionID }
        )
      )
      expect(response.statusCode).toBe(statusCodes.redirect)
      const storedError = await session.getState(controller.errorKey)
      expect(storedError.errors[questionKey].text).toBe('Enter a number')

      for (const [language, message] of [
        ['cy', 'Nodwch rif'],
        ['en', 'Enter a number']
      ]) {
        const result = await server.inject(
          withCsrfProtection(
            { method: 'GET', url: `${questionUrl}?lang=${language}` },
            { Cookie: session.sessionID }
          )
        )
        expect(result.statusCode).toBe(statusCodes.ok)
        const document = parseDocument(result.payload)
        expectValidationError(document, {
          message,
          href: `#${questionKey}`,
          input: { selector: questionElementSelector, value: 'ERROR' }
        })
      }

      expect(externalSpy).not.toHaveBeenCalled()
      expect(await session.getState(controller.errorKey)).toEqual(storedError)
      validateSpy.mockRestore()
      externalSpy.mockRestore()
    })

    it('retains a stored external error when local validation passes', async () => {
      const externalSpy = jest.spyOn(TestAnswer.prototype, 'validateExternally')
      await session.setState(controller.errorKey, {
        errors: { [questionKey]: { text: 'External error' } },
        errorMessages: [{ href: '#external-link', text: 'External error' }],
        payload: { [questionKey]: questionValue }
      })

      const result = await server.inject(
        withCsrfProtection(
          { method: 'GET', url: `${questionUrl}?lang=cy` },
          { Cookie: session.sessionID }
        )
      )
      expect(result.statusCode).toBe(statusCodes.ok)
      const document = parseDocument(result.payload)
      expectValidationError(document, {
        message: 'External error',
        href: '#external-link'
      })
      expect(externalSpy).not.toHaveBeenCalled()
      externalSpy.mockRestore()
    })

    it('should provide the question page on a GET without any session state', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: questionUrl
      })

      const document = parseDocument(payload)
      expect(document.title).toBe(translatedQuestion)
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

    it('should pass the translated question to the answer view model', async () => {
      const viewModelSpy = jest.spyOn(TestAnswer.prototype, 'viewModel')

      const { statusCode } = await server.inject({
        method: 'GET',
        url: questionUrl
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(viewModelSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          validate: false,
          question: translatedQuestion
        })
      )
    })
  })

  describe('POST', () => {
    it('should pass a request-bound translator to answer validation', async () => {
      const validateSpy = jest
        .spyOn(TestAnswer.prototype, 'validate')
        .mockImplementationOnce((translate) => {
          expect(translate).toEqual(expect.any(Function))
          if (!translate) {
            throw new Error('Expected a request-bound translator')
          }

          expect(translate(undefined, 'Fallback')).toBe('Fallback')
          return {
            isValid: false,
            errors: {
              [questionKey]: {
                text: translate(questionI18nKey, question)
              }
            }
          }
        })

      const response = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: questionUrl,
            payload: { [questionKey]: questionValue }
          },
          { Cookie: session.sessionID }
        )
      )

      expect(response.statusCode).toBe(statusCodes.redirect)
      expect(validateSpy).toHaveBeenCalledWith(expect.any(Function))
      const error = await session.getState(controller.errorKey)
      expect(error.errors[questionKey].text).toBe(translatedQuestion)
    })

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

    it('should call onAnswerSaved with the saved answer and application state once the answer is valid', async () => {
      const onAnswerSavedSpy = jest.spyOn(controller, 'onAnswerSaved')
      await session.setSectionState('origin', { onOffFarm: 'off' })

      await server.inject(
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

      expect(onAnswerSavedSpy).toHaveBeenCalledWith(
        expect.anything(),
        expect.any(TestAnswer),
        expect.objectContaining({ origin: { onOffFarm: 'off' } })
      )
    })

    it('should not call onAnswerSaved when the answer is invalid', async () => {
      validationSpy.mockReturnValueOnce({ isValid: false, errors: {} })
      const onAnswerSavedSpy = jest.spyOn(controller, 'onAnswerSaved')

      await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: questionUrl,
            payload: {
              [questionKey]: 'ERROR'
            }
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(onAnswerSavedSpy).not.toHaveBeenCalled()
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

    it('should set the next page to returnUrl if one exists', async () => {
      const { payload, statusCode } = await server.inject({
        method: 'GET',
        url: `${questionUrl}?returnUrl=${redirectUri}`
      })

      const document = parseDocument(payload)
      expect(document.title).toBe(translatedQuestion)

      expect(payload).toEqual(
        expect.stringContaining(
          `<input type="hidden" name="nextPage" value="${redirectUri}" />`
        )
      )

      expect(statusCode).toBe(statusCodes.ok)
    })

    it('should redirect to whatever the returnUrl specified, rather than next page', async () => {
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

      it.each([
        { language: 'en', title: 'Error', message: 'There is a problem' },
        { language: 'cy', title: 'Gwall', message: 'Mae problem wedi codi' }
      ])(
        'should render the $language error title, summary and field message',
        async ({ language, title, message }) => {
          const validateSpy = jest
            .spyOn(TestAnswer.prototype, 'validate')
            .mockImplementation((translate) => {
              if (!translate) {
                throw new Error('Expected a request-bound translator')
              }
              return {
                isValid: false,
                errors: {
                  [questionKey]: {
                    text: translate(
                      'common.errors.summaryTitle',
                      'There is a problem'
                    )
                  }
                }
              }
            })

          const url = `${questionUrl}?lang=${language}`
          const headers = { Cookie: session.sessionID }
          const post = await server.inject(
            withCsrfProtection(
              { method: 'POST', url, payload: { [questionKey]: 'ERROR' } },
              headers
            )
          )
          expect(post.statusCode).toBe(statusCodes.redirect)

          const response = await server.inject(
            withCsrfProtection({ method: 'GET', url }, headers)
          )
          const document = parseDocument(response.payload)

          expect(response.statusCode).toBe(statusCodes.ok)
          expect(document.title).toBe(`${title}: ${translatedQuestion}`)
          expect(
            document.querySelectorAll('.govuk-error-summary')
          ).toHaveLength(1)
          expect(
            document.querySelector('.govuk-error-summary__title')?.textContent
          ).toContain(message)
          expectValidationError(document, { message })
          validateSpy.mockRestore()
        }
      )

      it('should display an error to the user if answer is invalid, preserving returnUrl', async () => {
        const errorValue = 'ERROR'
        const questionUrlWithRedirectUri = `${questionUrl}?returnUrl=/next/page`
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

        const viewModelSpy = jest.spyOn(TestAnswer.prototype, 'viewModel')
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
        expect(erroredDocument.title).toBe(`Error: ${translatedQuestion}`)
        expect(input?.getAttribute('value')).toBe(errorValue)
        expect(viewModelSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            validate: true,
            question: translatedQuestion,
            errors: expect.anything()
          })
        )
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

    describe('when the answer fails external validation', () => {
      const externalError = { [questionKey]: { text: 'Not found' } }

      it('should redirect back to the question with the error, without saving the answer', async () => {
        const validateExternallySpy = jest
          .spyOn(TestAnswer.prototype, 'validateExternally')
          .mockResolvedValueOnce({ isValid: false, errors: externalError })
        const onAnswerSavedSpy = jest.spyOn(controller, 'onAnswerSaved')

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

        expect(validateExternallySpy).toHaveBeenCalledWith(
          expect.anything(),
          expect.any(Function)
        )
        expect(statusCode).toBe(statusCodes.redirect)
        expect(headers.location).toBe(questionUrl)
        expect(onAnswerSavedSpy).not.toHaveBeenCalled()

        const state = await session.getSectionState(sectionKey)
        expect(state?.[questionKey]).toBeUndefined()

        const viewModelSpy = jest.spyOn(TestAnswer.prototype, 'viewModel')
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

        expect(parseDocument(erroredGET.payload).title).toBe(
          `Error: ${translatedQuestion}`
        )
        expect(viewModelSpy).toHaveBeenCalledWith(
          expect.objectContaining({ validate: true, errors: externalError })
        )
      })

      it('should not call external validation when the answer is invalid', async () => {
        const validateExternallySpy = jest.spyOn(
          TestAnswer.prototype,
          'validateExternally'
        )

        await server.inject(
          withCsrfProtection(
            {
              method: 'POST',
              url: questionUrl,
              payload: {
                [questionKey]: 'ERROR'
              }
            },
            {
              Cookie: session.sessionID
            }
          )
        )

        expect(validateExternallySpy).not.toHaveBeenCalled()
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
        returnUrl: 'returnUrl'
      }
    }

    it('GET should render view with expected arguments', async () => {
      const result = await controller.getHandler(request, h)

      expect(h.view).toHaveBeenCalledTimes(1)
      expect(h.view).toHaveBeenCalledWith(
        questionView,
        expect.objectContaining({
          heading: translatedQuestion,
          nextPage: 'returnUrl',
          pageTitle: translatedQuestion,
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
          heading: translatedQuestion,
          nextPage: 'returnUrl',
          pageTitle: `Error: ${translatedQuestion}`,
          errorMessages: errorState.errorMessages,
          errors: errorState.errors,
          answerViewModel: testViewModel
        })
      )

      const viewArgs = h.view.mock.calls[0][1]
      expect(viewArgs.answer).toBeInstanceOf(TestAnswer)

      expect(result).toBe(mockView)
    })

    it('POST should render view with expected arguments', async () => {
      const payload = {
        nextPage: 'test_next_page',
        [questionKey]: 'ERROR'
      }
      const postRequest = {
        ...request,
        payload
      }

      await controller.postHandler(postRequest, h)

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
