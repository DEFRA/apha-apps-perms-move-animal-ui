import { GetObjectCommand } from '@aws-sdk/client-s3'
import { config } from '~/src/config/config.js'
import { sectionToSummary } from '../common/templates/macros/create-summary.js'
import { QuestionPage } from '../common/model/page/question-page-model.js'
import { QuestionPageController } from '../common/controller/question-page-controller/question-page-controller.js'
import { ConfirmationAnswer } from '../common/model/answer/confirmation/confirmation.js'
import { Page } from '../common/model/page/page-model.js'
import { ApplicationModel } from '../common/model/application/application.js'
import { sendNotification } from '../common/connectors/notify/notify.js'
import { StateManager } from '../common/model/state/state-manager.js'
import { compress as compressImage } from './image-compression.js'
import fileSize from '../common/helpers/file-size/file-size.js'

/**
 * @import {NextPage} from '../common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '../common/model/answer/confirmation/confirmation.js'
 */

const checkAnswersUrlPath = '/submit/check-answers'

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
    const appState = new StateManager(req).toState()

    const application = ApplicationModel.fromState(appState)

    const { isValid: isValidApplication } = application.validate()

    if (isValidPage && isValidApplication) {
      const emailContent = this.generateEmailContent(application)
      const notifyProps = { content: emailContent }

      if (application.tasks['biosecurity-map'] !== undefined) {
        const compressedFile = await this.handleBiosecurityFile(req)

        const { fileRetention, confirmDownloadConfirmation } =
          config.get('notify')
        notifyProps.link_to_file = {
          file: compressedFile?.toString('base64'),
          filename: 'Biosecurity-map.jpg',
          confirm_email_before_download: confirmDownloadConfirmation,
          retention_period: fileRetention
        }
      }

      await sendNotification(notifyProps)

      return Promise.resolve(super.handlePost(req, h)).finally(() => {
        req.yar.reset()
      })
    }

    if (!isValidApplication) {
      return h.redirect('/task-list-incomplete')
    }

    return super.handlePost(req, h)
  }

  generateEmailContent(application) {
    /**
     * @type {string[]}
     */
    const lines = []

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

  async handleBiosecurityFile(req) {
    const obj = await req.s3.send(
      new GetObjectCommand({
        Bucket: config.get('fileUpload').bucket ?? '',
        Key: req.yar.get('biosecurity-map')['upload-plan'].status.form.file
          .s3Key
      })
    )

    const chunks = []
    for await (const chunk of obj.Body) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    let compressedFile = null

    const { duration, file, reduction } = await compressImage(buffer)
    compressedFile = file
    this.logger.info(
      `Image compression took ${duration}ms at a reduction of ${reduction}% to ${fileSize(file.length)} MB`
    )

    return compressedFile
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submitSummary = new SubmitPageController().plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
