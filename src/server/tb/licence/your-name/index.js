import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

import { emailAddressPage } from '../email-address/index.js'
import { YourNameAnswer } from '../../../common/model/answer/your-name/your-name.js'

export class YourNamePage extends QuestionPage {
  urlPath = '/receiving-the-licence/your-name'
  sectionKey = 'licence'

  question = 'What is your name?'

  questionKey = 'yourName'

  Answer = YourNameAnswer

  nextPage() {
    return emailAddressPage
  }
}
export const yourNamePage = new YourNamePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const yourName = new TbQuestionPageController(yourNamePage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
