import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { QuantityHalfHerdAnswer } from '../../common/model/answer/quantity-half-herd/quantity-half-herd.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { destinationSummaryPage } from '../summary/index.js'

export class QuantityHalfHerdPage extends QuestionPage {
  urlPath = '/destination/quantity-half-herd'
  sectionKey = 'destination'
  question =
    'Will the number of cattle be larger than half of the destination herd size?'

  questionKey = 'movingMoreThanHalfExistingHerd'

  Answer = QuantityHalfHerdAnswer

  nextPage() {
    return destinationSummaryPage
  }
}

export const quantityHalfHerdPage = new QuantityHalfHerdPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const quantityHalfHerd = new QuestionPageController(
  new QuantityHalfHerdPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
