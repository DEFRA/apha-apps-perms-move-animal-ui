import { TbQuestionPageController } from '../../question-page-controller.js'
import { RestockReasonsAnswer } from '../../../common/model/answer/restock-reasons/restock-reasons.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { additionalInfoPage } from '../additional-info/index.js'
import { restockAdditionalInfoPage } from '../restock-additional-info/index.js'

export class RestockReasonPage extends QuestionPage {
  urlPath = '/destination/restocking-additional-info-reason'
  sectionKey = 'destination'
  question = 'Which reasons do you have for restocking?'

  questionKey = 'restockReasons'
  Answer = RestockReasonsAnswer

  /** @param {RestockReasonsAnswer} answer */
  nextPage(answer) {
    if (answer.value?.includes('other')) {
      return restockAdditionalInfoPage
    } else {
      return additionalInfoPage
    }
  }
}

export const restockReasonPage = new RestockReasonPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const restockReason = new TbQuestionPageController(
  restockReasonPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
