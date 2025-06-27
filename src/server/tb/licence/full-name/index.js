import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'

import { receiveMethodPage } from '../receiveMethod/index.js'
import { OwnerFullNameAnswer } from '../../../common/model/answer/owner-full-name/owner-full-name.js'

export class FullNamePage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-name'
  sectionKey = 'licence'

  question = 'What is the name of the registered owner of the cattle?'

  questionKey = 'fullName'

  Answer = OwnerFullNameAnswer

  nextPage() {
    return receiveMethodPage
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
