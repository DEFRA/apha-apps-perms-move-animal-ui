import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { QuantityOptionsAnswer } from '../../common/model/answer/quantity-options/quantity-options.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { quantityHalfHerdPage } from '../quantity-half-herd/index.js'
import { destinationSummaryPage } from '../summary/index.js'

export class QuantityOptionsPage extends QuestionPage {
  urlPath = '/destination/quantity-options'
  sectionKey = 'destination'
  question = 'Will you move more than 75 animals?'
  questionKey = 'movingMoreThan75Animals'

  Answer = QuantityOptionsAnswer

  /**
   * @param {QuantityOptionsAnswer} answer
   */
  nextPage(answer) {
    if (answer.value === 'no') {
      return quantityHalfHerdPage
    } else {
      return destinationSummaryPage
    }
  }
}

export const quantityOptionsPage = new QuantityOptionsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const quantityOptions = new QuestionPageController(
  new QuantityOptionsPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
