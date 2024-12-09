/**
 * Sets up the routes used in the email address page.
 * These routes are registered in src/server/router.js.
 */

import { EmailAddress } from '../../common/model/answer/email-address.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { licenceCheckAnswersPage } from '../check-answers/index.js'
import { QuestionPageController } from '../../common/controller/question-page-controller.js'

export class EmailAddressPage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-enter-email-address'
  sectionKey = 'licence'

  question = 'What email address would you like the licence sent to?'
  questionKey = 'emailAddress'

  view = 'licence/email-address/index'
  Answer = EmailAddress

  /** @param {EmailAddress} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    return licenceCheckAnswersPage
  }
}

export const emailAddressPage = new EmailAddressPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const emailAddress = new QuestionPageController(
  emailAddressPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
