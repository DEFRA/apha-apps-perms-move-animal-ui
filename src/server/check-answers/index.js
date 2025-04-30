import { config } from '~/src/config/config.js'
import { sectionToSummary } from '../common/templates/macros/create-summary.js'
import { QuestionPage } from '../common/model/page/question-page-model.js'
import { QuestionPageController } from '../common/controller/question-page-controller/question-page-controller.js'
import { ConfirmationAnswer } from '../common/model/answer/confirmation/confirmation.js'
import { Page } from '../common/model/page/page-model.js'
import { ApplicationModel } from '../common/model/application/application.js'
import {
  sendEmailToApplicant,
  sendEmailToCaseWorker
} from '../common/connectors/notify/notify.js'
import { StateManager } from '../common/model/state/state-manager.js'
import { fileSizeInMB } from '../common/helpers/file/size.js'
import { handleUploadedFile } from '../common/helpers/file/file-utils.js'
import { sizeErrorPage } from '../biosecurity-map/size-error/index.js'
import { getApplicationReference } from '../common/helpers/application-reference/index.js'

/**
 * @import {NextPage} from '../common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '../common/model/answer/confirmation/confirmation.js'
 */

const checkAnswersUrlPath = '/submit/check-answers'
const biosecurityMapKey = 'biosecurity-map'
const uploadPlanKey = 'upload-plan'

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

  urlPath = `/${this.sectionKey}/${this.questionKey}`

  view = `check-answers/index`

  Answer = ConfirmationAnswer

  nextPage() {
    return new ConfirmationPage()
  }

  viewProps(req) {
    const tasks = ApplicationModel.fromState(
      new StateManager(req).toState()
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
  constructor() {
    super(new SubmitSummaryPage())
  }

  handleGet(req, h) {
    const { isValid } = ApplicationModel.fromState(
      new StateManager(req).toState()
    ).validate()

    if (!isValid) {
      return h.redirect('/task-list-incomplete')
    }

    return super.handleGet(req, h)
  }

  async handlePost(req, h) {
    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new ConfirmationAnswer(payload)
    const { isValid: isValidPage } = confirmation.validate()
    const state = new StateManager(req)
    const applicationState = state.toState()

    const application = ApplicationModel.fromState(applicationState)

    const { isValid: isValidApplication } = application.validate()

    if (isValidPage && isValidApplication) {
      const reference = getApplicationReference()
      req.yar.set('applicationReference', reference, true)
      const emailContent = this.generateEmailContent(application, reference)
      const notifyProps = { content: emailContent }

      if (
        application.tasks[biosecurityMapKey] &&
        applicationState[biosecurityMapKey][uploadPlanKey].status
          ?.uploadStatus !== 'skipped'
      ) {
        const { file: compressedFile, extension } = await handleUploadedFile(
          req,
          applicationState[biosecurityMapKey][uploadPlanKey],
          this.logger
        )

        // Error if the file after compression is still too large
        if (fileSizeInMB(compressedFile.length) > 2) {
          return h.redirect(sizeErrorPage.urlPath)
        }

        const { fileRetention, confirmDownloadConfirmation } =
          config.get('notify')
        notifyProps.link_to_file = {
          file: compressedFile?.toString('base64'),
          filename: `Biosecurity-map.${extension}`,
          confirm_email_before_download: confirmDownloadConfirmation,
          retention_period: fileRetention
        }
      }

      await sendEmailToCaseWorker(notifyProps)
      if (config.get('featureFlags').emailConfirmation) {
        await sendEmailToApplicant({
          email: applicationState.licence.emailAddress,
          fullName: `${applicationState.licence.fullName.firstName} ${applicationState.licence.fullName.lastName}`,
          reference: reference ?? ''
        })
      }

      return super.handlePost(req, h)
    }

    if (!isValidApplication) {
      return h.redirect('/task-list-incomplete')
    }

    return super.handlePost(req, h)
  }

  generateEmailContent(application, reference) {
    /**
     * @type {string[]}
     */
    const lines = []

    lines.push(`# Application reference`)
    lines.push(reference)

    lines.push('')
    lines.push('---')

    Object.values(application.tasks).forEach((task) => {
      lines.push(`# ${task.config.title}`)
      lines.push('')
      lines.push('---')
      task.questionPageAnswers
        .filter(({ page }) => !page.isInterstitial)
        .forEach(({ page, answer }) => {
          lines.push(`## ${page.question}`)
          lines.push(answer.emailHtml.replace(/<br \/>/g, '\n'))
        })
    })

    return lines.join('\n')
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submitSummary = new SubmitPageController().plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
