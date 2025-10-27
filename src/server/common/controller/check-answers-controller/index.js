import { sectionToSummary } from '../../templates/macros/create-summary.js'
import { QuestionPage } from '../../model/page/question-page-model.js'
import { ConfirmationAnswer } from '../../model/answer/confirmation/confirmation.js'
import { Page } from '../../model/page/page-model.js'
import { submitApplication } from '../../connectors/case-management/case-management.js'
import { statusCodes } from '../../constants/status-codes.js'
import { QuestionPageController } from '../question-page-controller/question-page-controller.js'

/**
 * @import {NextPage} from '../../helpers/next-page.js'
 * @import {ConfirmationPayload} from '../../model/answer/confirmation/confirmation.js'
 * @import { AnswerModel, RawPayload } from '~/src/server/common/model/answer/answer-model.js'
 */

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

  view = `common/controller/check-answers-controller/index`

  Answer = ConfirmationAnswer

  nextPage() {
    return new ConfirmationPage()
  }

  async viewProps(req) {
    const tasks = this.ApplicationModel.fromState(
      new this.StateManager(req).toState()
    ).tasks

    const summary = Object.fromEntries(
      Object.values(tasks).map((task) => {
        const { key, title } = task.config
        return [key, { title, answers: sectionToSummary(task, this.urlPath) }]
      })
    )

    return Promise.resolve({ summary })
  }
}

export const submitSummaryPage = new SubmitSummaryPage()

export class SubmitPageController extends QuestionPageController {
  namespace = ''
  fileTooLargePath = ''

  async handleGet(req, h) {
    const { isValid } = this.page.ApplicationModel.fromState(
      new this.StateManager(req).toState()
    ).validate()

    req.logger.info('confirmation page requested')

    if (!isValid) {
      return h.redirect(`/${this.namespace}/task-list-incomplete`)
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

      req.yar.set(`${this.namespace}-confirmation-details`, {
        reference: message,
        'state-key': state.key
      })

      return super.handlePost(req, h)
    } catch (err) {
      if (err.output.statusCode === statusCodes.fileTooLarge) {
        return h.redirect(this.fileTooLargePath)
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

    const Answer = this.page.Answer
    const answer = new Answer(payload, applicationState)

    req.logger.info(`User confirmed submission as '${String(answer.value)}'`)

    const application = this.page.ApplicationModel.fromState(applicationState)

    const { isValid: isValidApplication } = application.validate()

    if (isValidPage && isValidApplication) {
      return await this._handleToCaseManagementApi(req, h)
    }

    if (!isValidApplication) {
      return h.redirect(`/${this.namespace}/task-list-incomplete`)
    }

    return super.handlePost(req, h)
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
