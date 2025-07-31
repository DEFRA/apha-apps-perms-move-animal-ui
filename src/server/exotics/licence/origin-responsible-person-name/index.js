import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { LicenceFullNameAnswer } from '../../common/model/answer/licence-full-name/licence-full-name.js'
import { emailPage } from '../email/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'originResponsiblePersonName'

export class OriginResponsiblePersonNamePage extends QuestionPage {
  urlPath = '/exotics/receiving-the-licence/origin/responsible-person-name'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'Who is responsible for the origin premises?'

  Answer = LicenceFullNameAnswer

  nextPage() {
    return emailPage
  }
}

export const originResponsiblePersonNamePage =
  new OriginResponsiblePersonNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const originResponsiblePersonName = new ExoticsQuestionPageController(
  originResponsiblePersonNamePage
).plugin()
