import { SectionSummaryPageController } from './section-summary-page-controller.js'
import { FormAction } from '@defra/forms-engine-plugin/types'
import { proceed } from '@defra/forms-engine-plugin/engine/helpers.js'
import { mapFormContextToAnswers } from '~/src/server/common/helpers/map-form-context.js'

jest.mock('~/src/server/common/helpers/map-form-context.js')

const mapFormContextToAnswersMock = /** @type {jest.Mock} */ (
  mapFormContextToAnswers
)

const h = {
  view: jest.fn()
}
const context = { formData: {} }
const request = {
  payload: {}
}

describe('SectionSummaryPageController', () => {
  let controller

  beforeEach(() => {
    controller = new SectionSummaryPageController()

    // Mock parent class properties
    controller.buildViewModel = jest
      .fn()
      .mockReturnValue({ baseProperty: 'base' })

    mapFormContextToAnswersMock.mockReturnValue([])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('makeGetRouteHandler', () => {
    it('should call h.view with correct viewName and viewModel and return the result from h.view', () => {
      const handler = controller.makeGetRouteHandler()
      const expectedResult = { rendered: 'view' }
      h.view.mockReturnValue(expectedResult)

      const result = handler(request, context, h)

      expect(h.view).toHaveBeenCalledWith(
        'defra-forms/check-answers',
        expect.any(Object)
      )
      expect(controller.buildViewModel).toHaveBeenCalledWith(context)
      expect(result).toBe(expectedResult)
    })
  })

  describe('makePostRouteHandler', () => {
    beforeEach(() => {
      controller.handleSaveAndExit = jest.fn()
    })

    it('should call handleSaveAndExit when action is SaveAndExit', () => {
      request.payload.action = FormAction.SaveAndExit
      const handler = controller.makePostRouteHandler()

      handler(request, context, h)

      expect(controller.handleSaveAndExit).toHaveBeenCalledWith(
        request,
        context,
        h
      )
    })

    it('should call proceed with continue destination when action is not SaveAndExit', () => {
      request.payload.action = FormAction.Continue
      const handler = controller.makePostRouteHandler()

      handler(request, context, h)

      expect(proceed).toHaveBeenCalledWith(request, h, '/task-list')
      expect(controller.handleSaveAndExit).not.toHaveBeenCalled()
    })

    it('should call proceed when no action is provided', () => {
      const handler = controller.makePostRouteHandler()

      handler(request, context, h)

      expect(proceed).toHaveBeenCalledWith(request, h, '/task-list')
      expect(controller.handleSaveAndExit).not.toHaveBeenCalled()
    })
  })

  describe('buildViewModel', () => {
    beforeEach(() => {
      controller = {
        ...controller,
        buildViewModel: (context) =>
          SectionSummaryPageController.prototype.buildViewModel.call(
            controller,
            context
          ),
        pageDef: jest.fn().mockReturnValue({ title: 'Page Title' }),
        buildSummaryListRows: jest
          .fn()
          .mockReturnValue([
            { key: { text: 'Question 1' }, value: { html: 'Answer 1' } }
          ])
      }
    })

    it('should build view model with base properties', () => {
      const result = controller.buildViewModel(context)

      expect(controller.buildSummaryListRows).toHaveBeenCalledWith(context)
      expect(result).toMatchObject({
        pageTitle: 'Check your answers before you continue your application',
        heading: 'Check your answers before you continue your application',
        context,
        hasAnswers: true,
        continueButtonText: 'Continue',
        continueAction: FormAction.Continue
      })
    })

    it('should use default heading when pageDef title is not set', () => {
      controller.pageDef = {}

      const result = controller.buildViewModel(context)

      expect(result.heading).toBe(
        'Check your answers before you continue your application'
      )
      expect(result.pageTitle).toBe(
        'Check your answers before you continue your application'
      )
    })

    it('should include summary list rows', () => {
      const mockRows = [
        { key: { text: 'Q1' }, value: { html: 'A1' } },
        { key: { text: 'Q2' }, value: { html: 'A2' } }
      ]
      controller.buildSummaryListRows.mockReturnValue(mockRows)

      const result = controller.buildViewModel(context)

      expect(result.summaryListRows).toEqual(mockRows)
      expect(result.hasAnswers).toBe(true)
    })

    it('should set hasAnswers to false when no rows', () => {
      controller.buildSummaryListRows.mockReturnValue([])

      const result = controller.buildViewModel(context)

      expect(result.hasAnswers).toBe(false)
    })
  })

  describe('buildSummaryListRows', () => {
    beforeEach(() => {
      controller.buildSummaryListRows = (context) =>
        SectionSummaryPageController.prototype.buildSummaryListRows.call(
          controller,
          context
        )

      controller.getSummaryPath = jest.fn().mockReturnValue('/summary')
    })

    it('should map answers to summary list rows', () => {
      const mockAnswers = [
        {
          question: 'Question one?',
          questionKey: 'questionKey1',
          answer: { displayText: 'Answer 1' },
          changeHref: '/change/question-one'
        },
        {
          question: 'Question 2?',
          questionKey: 'questionKey2',
          answer: { displayText: 'Answer 2' },
          changeHref: '/change/question-two'
        }
      ]
      mapFormContextToAnswersMock.mockReturnValue(mockAnswers)

      const result = controller.buildSummaryListRows(context)

      expect(mapFormContextToAnswersMock).toHaveBeenCalledWith(context, {
        returnPath: '/summary'
      })
      expect(result).toHaveLength(2)
      expect(result[0]).toMatchObject({
        key: {
          text: 'Question one?',
          classes: 'govuk-!-width-one-half govuk-!-font-weight-regular'
        },
        value: {
          html: 'Answer 1'
        },
        actions: {
          items: [
            {
              href: '/change/question-one',
              text: 'Change',
              classes: 'govuk-link--no-visited-state',
              visuallyHiddenText: 'Question one?'
            }
          ]
        }
      })
      expect(result[1]).toMatchObject({
        key: {
          text: 'Question 2?',
          classes: 'govuk-!-width-one-half govuk-!-font-weight-regular'
        },
        value: {
          html: 'Answer 2'
        },
        actions: {
          items: [
            {
              href: '/change/question-two',
              text: 'Change',
              classes: 'govuk-link--no-visited-state',
              visuallyHiddenText: 'Question 2?'
            }
          ]
        }
      })
    })

    it('should handle missing question text by using questionKey', () => {
      mapFormContextToAnswersMock.mockReturnValue([
        {
          questionKey: 'testKey',
          answer: { displayText: 'Test Answer' },
          changeHref: '/change'
        }
      ])

      const result = controller.buildSummaryListRows(context)

      expect(result[0].key.text).toBe('testKey')
    })

    it('should use "Answer" as fallback when question and questionKey are missing', () => {
      mapFormContextToAnswersMock.mockReturnValue([
        {
          answer: { displayText: 'Test Answer' },
          changeHref: '/change'
        }
      ])

      const result = controller.buildSummaryListRows(context)

      expect(result[0].key.text).toBe('Answer')
    })

    it('should handle whitespace in question text', () => {
      mapFormContextToAnswersMock.mockReturnValue([
        {
          question: '  Question with spaces  ',
          answer: { displayText: 'Answer' },
          changeHref: '/change'
        }
      ])

      const result = controller.buildSummaryListRows(context)

      expect(result[0].key.text).toBe('Question with spaces')
    })

    it('should display "Not supplied" when answer is missing', () => {
      mapFormContextToAnswersMock.mockReturnValue([
        {
          question: 'Test Question',
          changeHref: '/change'
        }
      ])

      const result = controller.buildSummaryListRows(context)

      expect(result[0].value.html).toBe('Not supplied')
    })

    it('should not include actions when changeHref is not provided', () => {
      mapFormContextToAnswersMock.mockReturnValue([
        {
          question: 'Test Question',
          answer: { displayText: 'Test Answer' }
        }
      ])

      const result = controller.buildSummaryListRows(context)

      expect(result[0].actions).toBeUndefined()
    })
  })

  describe('getContinueDestination', () => {
    it('should return the continueDestination property', () => {
      const result = controller.getContinueDestination()

      expect(result).toBe('/task-list')
    })

    it('should return custom destination when overridden', () => {
      controller.continueDestination = '/custom-path'

      const result = controller.getContinueDestination()

      expect(result).toBe('/custom-path')
    })
  })
})
