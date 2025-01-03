import { sectionToSummary } from '../common/templates/macros/create-summary.js'
import { OriginSection } from '../common/model/section/origin/origin.js'
import { LicenceSection } from '../common/model/section/licence/licence.js'
import { DestinationSection } from '../common/model/section/destination/destination.js'
import { QuestionPage } from '../common/model/page/question-page-model.js'
import { QuestionPageController } from '../common/controller/question-page-controller/question-page-controller.js'
import { ConfirmationAnswer } from '../common/model/answer/confirmation/confirmation.js'
import { Page } from '../common/model/page/page-model.js'

const checkAnswersUrlPath = '/submit/check-answers'

class ConfirmationPage extends Page {
  urlPath = `/submit/confirmation`
}

export class SubmitSummaryPage extends QuestionPage {
  pageTitle = 'Check your answers before sending your application'
  pageHeading = 'Check your answers before sending your application'
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

class SubmitPageController extends QuestionPageController {
  constructor() {
    super(new SubmitSummaryPage())
  }

  postHandler(req, h) {
    // eslint-disable-next-line no-console
    console.info('do custom logic here')

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
