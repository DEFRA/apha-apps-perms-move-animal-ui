import { FullNameAnswer } from '~/src/server/common/model/answer/fullName/fullName.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'

import { receiveMethodPage } from '../receiveMethod/index.js'

export class FullNamePage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-name'
  sectionKey = 'licence'

  question = 'What is the name of the County Parish Holding (CPH) owner?'

  questionKey = 'fullName'

  Answer = FullNameAnswer

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
