import { sectionToSummary } from '../../templates/macros/create-summary.js'
import { QuestionPage } from '../../model/page/question-page-model.js'
import { ConfirmationAnswer } from '../../model/answer/confirmation/confirmation.js'
import { QuestionPageController } from '../question-page-controller/question-page-controller.js'
import { submitApplication } from '../../connectors/case-management/case-management.js'
import { statusCodes } from '../../constants/status-codes.js'
import { sizeErrorPage } from '~/src/server/biosecurity-map/size-error/index.js'
import { Page } from '../../model/page/page-model.js'

/**
 * @import {NextPage} from '~/src/server/common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '~/src/server/common/model/answer/confirmation/confirmation.js'
 */

class ConfirmationPage extends Page {
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

  // urlPath = `/${this.sectionKey}/${this.questionKey}`

  view = `check-answers/index`

  Answer = ConfirmationAnswer

  nextPage() {
    return new ConfirmationPage()
  }
}

export const submitSummaryPage = new SubmitSummaryPage()

export class SubmitPageController extends QuestionPageController {
  StateManager
  ApplicationModel
  taskListIncompletePath

  handleGet(req, h) {
    const { isValid } = this.ApplicationModel.fromState(
      new this.StateManager(req).toState()
    ).validate()

    if (!isValid) {
      return h.redirect(this.taskListIncompletePath)
    }

    const tasks = this.ApplicationModel.fromState(
      new this.StateManager(req).toState()
    ).tasks

    const summary = Object.fromEntries(
      Object.values(tasks).map((task) => {
        const { key, title } = task.config
        return [
          key,
          { title, answers: sectionToSummary(task, this.page.urlPath) }
        ]
      })
    )

    return super.handleGet(req, h, { summary })
  }

  async _handleToCaseManagementApi(req, h) {
    const state = new this.StateManager(req)
    const applicationState = state.toState()

    const application = this.ApplicationModel.fromState(applicationState)

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

      req.yar.set('applicationReference', message) // <- TODO refactor this into being part of the state store specified
      return super.handlePost(req, h)
    } catch (err) {
      if (err.output.statusCode === statusCodes.fileTooLarge) {
        return h.redirect(sizeErrorPage.urlPath)
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
    const state = new this.StateManager(req)
    const applicationState = state.toState()

    const application = this.ApplicationModel.fromState(applicationState)

    const { isValid: isValidApplication } = application.validate()

    if (isValidPage && isValidApplication) {
      return await this._handleToCaseManagementApi(req, h)
    }

    if (!isValidApplication) {
      return h.redirect(this.taskListIncompletePath)
    }

    return super.handlePost(req, h)
  }
}
