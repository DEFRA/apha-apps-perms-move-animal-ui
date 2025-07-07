import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { productLocationCphNumberPage } from '../product-location-cph-number/index.js'
import { originAddressPage } from '../origin-address/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'productLocationHasACphNumber'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    validation: {
      empty: 'Select if the origin premises has a CPH number'
    },
    layout: 'inline'
  }
}

export class ProductLocationHasACphNumberPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/product-location/cph-yes-no'

  questionKey = questionKey
  sectionKey = 'movementOrigin'
  question =
    'Does the origin premises have a county parish holding (CPH) number?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return productLocationCphNumberPage
    }

    return originAddressPage
  }
}

export const productLocationHasACphNumberPage =
  new ProductLocationHasACphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const productLocationHasACphNumber = new ExoticsQuestionPageController(
  productLocationHasACphNumberPage
).plugin()
