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
import { compress } from './image-compression.js'

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
    if (config.get('featureFlags').biosecurity) {
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

      const { duration, quality, manipulations } = await compress(buffer)
      req.logger.info(
        `Image compression took ${duration}ms at a quality of ${quality}% after ${manipulations} manipulation(s)`
      )
    }

    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new ConfirmationAnswer(payload)
    const { isValid: isValidPage } = confirmation.validate()

    const application = ApplicationModel.fromState(
      new StateManager(req).toState()
    )

    const { isValid: isValidApplication } = application.validate()

    if (isValidPage && isValidApplication) {
      const emailContent = Object.values(application.tasks)
        .flatMap(({ questionPageAnswers }) =>
          questionPageAnswers.map(
            ({ page, answer }) =>
              `## ${page.question}\n${answer.html.replace(/<br \/>/g, '\n')}`
          )
        )
        .join('\n')

      const notifyProps = {
        content: emailContent
      }

      await sendNotification(notifyProps)

      return Promise.resolve(super.handlePost(req, h)).finally(() =>
        req.yar.reset()
      )
    }

    if (!isValidApplication) {
      return h.redirect('/task-list-incomplete')
    }

    return super.handlePost(req, h)
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submitSummary = new SubmitPageController().plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
