import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { LicenceFullNameAnswer } from '../../common/model/answer/licence-full-name/licence-full-name.js'
import { emailPage } from '../email/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'visitResponsiblePersonName'

export class VisitResponsiblePersonNamePage extends QuestionPage {
  urlPath = '/exotics/receiving-the-licence/visit/responsible-person-name'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'Who is responsible for the premises where the visit is happening?'

  Answer = LicenceFullNameAnswer

  nextPage() {
    return emailPage
  }
}

export const visitResponsiblePersonNamePage =
  new VisitResponsiblePersonNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const visitResponsiblePersonName = new ExoticsQuestionPageController(
  visitResponsiblePersonNamePage
).plugin()
