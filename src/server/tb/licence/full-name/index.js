import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

import { receiveMethodPage } from '../receiveMethod/index.js'
import { OwnerFullNameAnswer } from '../../../common/model/answer/owner-full-name/owner-full-name.js'

export class FullNamePage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-name'
  sectionKey = 'licence'

  question = 'What is the name of the registered owner of the animals?'

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
export const fullName = new TbQuestionPageController(fullNamePage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
