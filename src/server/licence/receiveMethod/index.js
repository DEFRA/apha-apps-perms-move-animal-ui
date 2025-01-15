/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

import { ReceiveMethodAnswer } from '~/src/server/common/model/answer/receiveMethod/receiveMethod.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'

import { emailAddressPage } from '../email-address/index.js'
import { postExitPage } from '../postExitPage/index.js'

export class ReceiveMethodPage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-email-or-post'
  sectionKey = 'licence'

  question = 'How would you like this licence sent to you?'

  questionKey = 'receiveMethod'

  view = 'licence/receiveMethod/index'
  Answer = ReceiveMethodAnswer

  /** @param {ReceiveMethodAnswer} answer */
  nextPage(answer) {
    if (answer.value === 'post') {
      return postExitPage
    }
    return emailAddressPage
  }
}
export const receiveMethodPage = new ReceiveMethodPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const receiveMethod = new QuestionPageController(
  receiveMethodPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
