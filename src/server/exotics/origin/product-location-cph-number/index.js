import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { originAddressPage } from '../origin-address/index.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'productLocationCphNumber'

export class ProductLocationCphNumberPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/product-location/cph-number'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What is the CPH number for the origin premises?'

  Answer = CphNumberAnswer

  nextPage() {
    return originAddressPage
  }
}

export const productLocationCphNumberPage = new ProductLocationCphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const productLocationCphNumber = new ExoticsQuestionPageController(
  productLocationCphNumberPage
).plugin()
