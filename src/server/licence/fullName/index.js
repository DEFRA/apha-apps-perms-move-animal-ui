/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

import { FullNameAnswer } from '~/src/server/common/model/answer/fullName/fullName.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'

import { emailAddressPage } from '../email-address/index.js'

export class FullNamePage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-name'
  sectionKey = 'licence'

  question = 'What is the name of the County Parish Holding (CPH) owner?'

  questionKey = 'fullName'

  view = 'licence/fullName/index'
  Answer = FullNameAnswer

  nextPage() {
    return emailAddressPage
  }
}
export const fullNamePage = new FullNamePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const fullName = new QuestionPageController(fullNamePage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
