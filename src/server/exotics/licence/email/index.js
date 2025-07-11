import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { EmailAddressAnswer } from '~/src/server/common/model/answer/email-address/email-address.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'email'

export class EmailPage extends QuestionPage {
  urlPath = '/exotics/receiving-the-licence/enter-email-address'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'What email address would you like the licence sent to?'

  Answer = EmailAddressAnswer

  nextPage() {
    return checkAnswersPage
  }
}

export const emailPage = new EmailPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const email = new ExoticsQuestionPageController(emailPage).plugin()
