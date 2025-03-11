import { FullNameAnswer } from '~/src/server/common/model/answer/fullName/fullName.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'

import { receiveMethodPage } from '../receiveMethod/index.js'

export class FullNameFuturePage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-name-future'
  sectionKey = 'licence'

  question = 'Who will be the registered owner of the cattle?'

  questionKey = 'fullName'

  Answer = FullNameAnswer

  nextPage() {
    return receiveMethodPage
  }
}
export const fullNameFuturePage = new FullNameFuturePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const fullNameFuture = new QuestionPageController(
  fullNameFuturePage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
