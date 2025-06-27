import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { RestockAdditionalInfoAnswer } from '../../../common/model/answer/restock-additional-info/restock-additional-info.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { additionalInfoPage } from '../additional-info/index.js'

export class RestockAdditionalInfoPage extends QuestionPage {
  urlPath = '/destination/restocking-additional-info-reason-other'
  sectionKey = 'destination'
  question = 'What is the reason for restocking?'
  questionKey = 'restockAdditionalInfo'

  Answer = RestockAdditionalInfoAnswer

  nextPage() {
    return additionalInfoPage
  }
}

export const restockAdditionalInfoPage = new RestockAdditionalInfoPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const restockAdditionalInfo = new QuestionPageController(
  restockAdditionalInfoPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
