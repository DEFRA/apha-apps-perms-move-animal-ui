import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { productLocationHasACphNumberPage } from '../product-location-has-a-cph-number/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfProductLocation'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      farm: {
        label: 'Farm'
      },
      'corporate-holding': {
        label: 'Corporate holding',
        hint: 'Such as a food business or animal feed company'
      },
      'domestic-residence': {
        label: 'Domestic residence'
      },
      other: {
        label: 'Another location'
      }
    },
    validation: {
      empty: 'Select the location of the products'
    }
  }
}

export class TypeOfProductLocationPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/product-location'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'Where are the products located?'

  Answer = Answer

  nextPage() {
    return productLocationHasACphNumberPage
  }
}

export const typeOfProductLocationPage = new TypeOfProductLocationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfProductLocation = new ExoticsQuestionPageController(
  typeOfProductLocationPage
).plugin()
