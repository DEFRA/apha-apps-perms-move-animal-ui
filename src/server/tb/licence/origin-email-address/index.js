import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

import { destinationEmailAddressPage } from '../destination-email-address/index.js'
import { OriginEmailAddressAnswer } from '../../../common/model/answer/origin-email-address/origin-email-address.js'

export class OriginEmailAddressPage extends QuestionPage {
  urlPath = '/receiving-the-licence/origin-email-address'
  sectionKey = 'licence'

  question = 'What is the email address for the origin premises?'

  questionKey = 'originEmail'

  Answer = OriginEmailAddressAnswer

  nextPage() {
    return destinationEmailAddressPage
  }
}
export const originEmailAddressPage = new OriginEmailAddressPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originEmailAddress = new TbQuestionPageController(
  originEmailAddressPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
