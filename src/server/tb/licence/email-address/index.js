/**
 * Sets up the routes used in the email address page.
 * These routes are registered in src/server/router.js.
 */

import { EmailAddressAnswer } from '../../../common/model/answer/email/email-address.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { licenceSummaryPage } from '../check-answers/index.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

export class EmailAddressPage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-enter-email-address'
  sectionKey = 'licence'

  question = 'What email address would you like the licence sent to?'
  questionKey = 'emailAddress'

  Answer = EmailAddressAnswer

  /** @param {EmailAddressAnswer} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    return licenceSummaryPage
  }
}

export const emailAddressPage = new EmailAddressPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const emailAddress = new TbQuestionPageController(
  emailAddressPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
