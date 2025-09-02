import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { LicenceFullNameAnswer } from '../../common/model/answer/licence-full-name/licence-full-name.js'
import { emailPage } from '../email/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'visitResponsiblePersonName'

export class VisitResponsiblePersonNamePage extends QuestionPage {
  urlPath = '/fmd/receiving-the-licence/visit/responsible-person-name'

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
export const visitResponsiblePersonName = new FmdQuestionPageController(
  visitResponsiblePersonNamePage
).plugin()
