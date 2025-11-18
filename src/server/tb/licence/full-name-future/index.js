import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

import { FullNameFutureAnswer } from '../../../common/model/answer/full-name-future/full-name-future.js'
import { emailAddressPage } from '../email-address/index.js'

export class FullNameFuturePage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-name-will-be'
  sectionKey = 'licence'

  question = 'Who will be the registered owner of the animals?'

  questionKey = 'fullName'

  Answer = FullNameFutureAnswer

  nextPage() {
    return emailAddressPage
  }
}
export const fullNameFuturePage = new FullNameFuturePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const fullNameFuture = new TbQuestionPageController(
  fullNameFuturePage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
