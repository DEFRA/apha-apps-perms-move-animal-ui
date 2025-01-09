import { sectionToSummary } from '../common/templates/macros/create-summary.js'
import { OriginSection } from '../common/model/section/origin/origin.js'
import { LicenceSection } from '../common/model/section/licence/licence.js'
import { DestinationSection } from '../common/model/section/destination/destination.js'
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
    const tasks = {
      origin: OriginSection.fromState(req.yar.get('origin')),
      licence: LicenceSection.fromState(req.yar.get('licence')),
      destination: DestinationSection.fromState(req.yar.get('destination'))
    }

    return {
      origin: sectionToSummary(tasks.origin, checkAnswersUrlPath),
      licence: sectionToSummary(tasks.licence, checkAnswersUrlPath),
      destination: sectionToSummary(tasks.destination, checkAnswersUrlPath)
    }
  }
}

export const submitSummaryPage = new SubmitSummaryPage()

export class SubmitPageController extends QuestionPageController {
  constructor() {
    super(new SubmitSummaryPage())
  }

  getHandler(req, h) {
    const application = ApplicationModel.fromState({
      origin: req.yar.get('origin'),
      licence: req.yar.get('licence'),
      destination: req.yar.get('destination')
    })

    const { isValid } = application.validate()

    if (!isValid) {
      return h.redirect('/task-list-incomplete')
    }

    return super.getHandler(req, h)
  }

  async postHandler(req, h) {
    const payload = /** @type {ConfirmationPayload & NextPage} */ (req.payload)
    const confirmation = new ConfirmationAnswer(payload)
    const { isValid: isValidPage } = confirmation.validate()

    const application = ApplicationModel.fromState({
      origin: req.yar.get('origin'),
      licence: req.yar.get('licence'),
      destination: req.yar.get('destination')
    })

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
    }

    if (!isValidApplication) {
      return h.redirect('/task-list-incomplete')
    }

    return super.postHandler(req, h)
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submitSummary = new SubmitPageController().plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
