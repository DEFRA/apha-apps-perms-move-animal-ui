import { sectionToSummary } from '../common/templates/macros/create-summary.js'
import { QuestionPage } from '../common/model/page/question-page-model.js'
import { ConfirmationAnswer } from '../common/model/answer/confirmation/confirmation.js'
import { Page } from '../common/model/page/page-model.js'
import { submitApplication } from '../common/connectors/case-management/case-management.js'
import { statusCodes } from '../common/constants/status-codes.js'
import { QuestionPageController } from '../common/controller/question-page-controller/question-page-controller.js'

/**
 * @import {NextPage} from '../common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '../common/model/answer/confirmation/confirmation.js'
 */

const checkAnswersUrlPath = '/tb/submit/check-answers'

export class ConfirmationPage extends Page {
  urlPath = `/submit/confirmation`
}

const headingAndTitle = 'Check your answers before sending your application'

export class SubmitSummaryPage extends QuestionPage {
  question =
    'Before you submit your application, you must select one of the declaration check boxes.'

  get title() {
    return headingAndTitle
  }

  get heading() {
    return headingAndTitle
  }

  sectionKey = 'submit'
  questionKey = 'check-answers'

  view = `check-answers/index`

  Answer = ConfirmationAnswer

  nextPage() {
    return new ConfirmationPage()
  }

  viewProps(req) {
    const tasks = this.ApplicationModel.fromState(
      new this.StateManager(req).toState()
    ).tasks

    const summary = Object.fromEntries(
      Object.values(tasks).map((task) => {
        const { key, title } = task.config
        return [
          key,
          { title, answers: sectionToSummary(task, checkAnswersUrlPath) }
        ]
      })
    )

    return { summary }
  }
}

export const submitSummaryPage = new SubmitSummaryPage()

export class SubmitPageController extends QuestionPageController {
  handleGet(req, h) {
    const { isValid } = this.page.ApplicationModel.fromState(
      new this.StateManager(req).toState()
    ).validate()

    if (!isValid) {
      return h.redirect('/task-list-incomplete')
    }

    return super.handleGet(req, h)
  }

  async _handleToCaseManagementApi(req, h) {
    const state = new this.page.StateManager(req)
    const applicationState = state.toState()

    const application = this.page.ApplicationModel.fromState(applicationState)

    try {
      const {
        payload: { message },
        statusCode
      } = await submitApplication(application)

      if (statusCode !== statusCodes.ok) {
        throw new Error(
          `Unhandled status code from case management API: ${statusCode}`
        )
      }

      req.yar.set('applicationReference', message)
      return super.handlePost(req, h)
    } catch (err) {
      if (err.output.statusCode === statusCodes.fileTooLarge) {
        // TEMPLATE-TODO: send this somewhere sensible
        return h.redirect('/biosecurity-map/size-error')
      } else {
        throw new Error(
          `Failed to send application to case management API: ${err.message}`
        )
      }
    }
  }

  async handlePost(req, h) {
    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new ConfirmationAnswer(payload)
    const { isValid: isValidPage } = confirmation.validate()
    const state = new this.page.StateManager(req)
    const applicationState = state.toState()

    const application = this.page.ApplicationModel.fromState(applicationState)

    const { isValid: isValidApplication } = application.validate()

    if (isValidPage && isValidApplication) {
      return await this._handleToCaseManagementApi(req, h)
    }

    if (!isValidApplication) {
      return h.redirect('/task-list-incomplete')
    }

    return super.handlePost(req, h)
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
