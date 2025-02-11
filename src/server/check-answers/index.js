import { sectionToSummary } from '../common/templates/macros/create-summary.js'
import { QuestionPage } from '../common/model/page/question-page-model.js'
import { QuestionPageController } from '../common/controller/question-page-controller/question-page-controller.js'
import { ConfirmationAnswer } from '../common/model/answer/confirmation/confirmation.js'
import { Page } from '../common/model/page/page-model.js'
import { ApplicationModel } from '../common/model/application/application.js'
import { sendNotification } from '../common/connectors/notify/notify.js'

const checkAnswersUrlPath = '/submit/check-answers'

/**
 * @import {NextPage} from '../common/helpers/next-page.js'
 * @import {ConfirmationPayload} from '../common/model/answer/confirmation/confirmation.js'
 */

class ConfirmationPage extends Page {
  urlPath = `/submit/confirmation`
}

export class SubmitSummaryPage extends QuestionPage {
  question = 'Check your answers before sending your application'
  sectionKey = 'submit'
  questionKey = 'check-answers'
  urlPath = `/${this.sectionKey}/${this.questionKey}`

  view = `check-answers/index`

  Answer = ConfirmationAnswer

  nextPage() {
    return new ConfirmationPage()
  }

  viewProps(req) {
    const tasks = ApplicationModel.fromReq(req).tasks

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
    const { isValid } = ApplicationModel.fromReq(req).validate()

    if (!isValid) {
      return h.redirect('/task-list-incomplete')
    }

    return super.handleGet(req, h)
  }

  async handlePost(req, h) {
    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new ConfirmationAnswer(payload)
    const { isValid: isValidPage } = confirmation.validate()

    const application = ApplicationModel.fromReq(req)

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

      await sendNotification({
        content: emailContent
      })

      req.yar.reset()
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
