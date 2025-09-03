import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { EmailAddressAnswer } from '~/src/server/common/model/answer/email-address/email-address.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'emailAddress'

export class EmailAddressPage extends QuestionPage {
  urlPath = '/fmd/receiving-the-licence/email-address'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'What email address would you like the licence sent to?'

  Answer = EmailAddressAnswer

  nextPage() {
    return checkAnswersPage
  }
}

export const emailAddressPage = new EmailAddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const emailAddress = new FmdQuestionPageController(
  emailAddressPage
).plugin()
