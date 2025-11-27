import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

import { licenceSummaryPage } from '../check-answers/index.js'
import { DestinationEmailAddressAnswer } from '../../../common/model/answer/destination-email-address/destination-email-address.js'

export class DestinationEmailAddressPage extends QuestionPage {
  urlPath = '/receiving-the-licence/destination-email-address'
  sectionKey = 'licence'

  question = 'What is your email address?'

  questionKey = 'destinationEmail'

  Answer = DestinationEmailAddressAnswer

  nextPage() {
    return licenceSummaryPage
  }
}
export const destinationEmailAddressPage = new DestinationEmailAddressPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationEmailAddress = new TbQuestionPageController(
  destinationEmailAddressPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
