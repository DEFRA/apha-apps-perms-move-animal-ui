import { proceed } from '@defra/forms-engine-plugin/engine/helpers.js'
import { FormAction } from '@defra/forms-engine-plugin/types'
import { mapFormContextToAnswers } from '~/src/server/common/plugins/defra-forms/form-context.js'
import { QuestionPageController } from '@defra/forms-engine-plugin/controllers/index.js'

export class SectionSummaryPageController extends QuestionPageController {
  isSummaryPage = true
  viewName = 'defra-forms/check-answers'
  continueDestination = '/task-list'
  continueButtonText = 'Continue'
  defaultHeading = 'Check your answers before you continue your application'

  makeGetRouteHandler() {
    return (request, context, h) => {
      return h.view(this.viewName, this.buildViewModel(context))
    }
  }

  makePostRouteHandler() {
    return (request, context, h) => {
      const action = request.payload?.action

      if (action === FormAction.SaveAndExit) {
        return /** @type {QuestionPageController} */ (this).handleSaveAndExit(
          request,
          context,
          h
        )
      }

      return proceed(request, h, this.getContinueDestination())
    }
  }

  buildViewModel(context) {
    const base = /** @type {QuestionPageController} */ (this).viewModel
    const heading =
      /** @type {QuestionPageController} */ (this).pageDef.title ||
      this.defaultHeading
    const rows = this.buildSummaryListRows(context)

    return {
      ...base,
      pageTitle: heading,
      heading,
      context,
      summaryListRows: rows,
      hasAnswers: rows.length > 0,
      continueButtonText: this.continueButtonText,
      continueAction: FormAction.Continue
    }
  }

  buildSummaryListRows(context) {
    const answers = mapFormContextToAnswers(context, {
      returnPath: /** @type {QuestionPageController} */ (this).getSummaryPath()
    })

    return answers.map(({ question, questionKey, answer, changeHref }) => {
      const questionText = question?.trim() || questionKey || 'Answer'

      return {
        key: {
          text: questionText,
          classes: 'govuk-!-width-one-half govuk-!-font-weight-regular'
        },
        value: {
          html: answer?.displayText || 'Not supplied'
        },
        actions: changeHref
          ? {
              items: [
                {
                  href: changeHref,
                  text: 'Change',
                  classes: 'govuk-link--no-visited-state',
                  visuallyHiddenText: questionText || 'answer'
                }
              ]
            }
          : undefined
      }
    })
  }

  getContinueDestination() {
    return this.continueDestination
  }
}
