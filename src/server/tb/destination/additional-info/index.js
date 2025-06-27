import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { AdditionalInfoAnswer } from '../../../common/model/answer/additional-info/additional-info.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { destinationSummaryPage } from '../summary/index.js'

export class AdditionalInfoPage extends QuestionPage {
  urlPath = '/destination/any-additional-info'
  sectionKey = 'destination'
  question = 'Enter any additional information (optional)'
  questionKey = 'additionalInfo'

  Answer = AdditionalInfoAnswer

  nextPage() {
    return destinationSummaryPage
  }
}

export const additionalInfoPage = new AdditionalInfoPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const additionalInfo = new QuestionPageController(
  additionalInfoPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
