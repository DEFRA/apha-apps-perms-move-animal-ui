import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

import { OwnerFullNameAnswer } from '../../../common/model/answer/owner-full-name/owner-full-name.js'
import { emailAddressPage } from '../email-address/index.js'

export class FullNamePage extends QuestionPage {
  urlPath = '/receiving-the-licence/licence-name'
  sectionKey = 'licence'

  question =
    'What is the name of the person registered as the keeper of the animals?'

  questionKey = 'fullName'

  Answer = OwnerFullNameAnswer

  nextPage() {
    return emailAddressPage
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
