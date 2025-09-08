import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { abpSomewhereElseExitPage } from '../abp-somewhere-else/index.js'
import { destinationBusinessNamePage } from '../destination-business-name/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalByProductsDestination'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      'rendering-plant': { label: 'Rendering plant' },
      incinerator: { label: 'Incinerator' },
      'somewhere-else': { label: 'Somewhere else' }
    },
    validation: {
      empty: 'Select where the animal by-products are going'
    }
  }
}

export class AnimalByProductsDestinationPage extends QuestionPage {
  urlPath = '/fmd/disposal-of-animals/ABP-premises-type'

  questionKey = questionKey
  sectionKey = 'disposal'
  question = 'Where are the animal by-products going?'

  Answer = Answer

  /**
   * @param {Answer} answer
   */
  nextPage(answer) {
    if (answer.value === 'somewhere-else') {
      return abpSomewhereElseExitPage
    }
    return destinationBusinessNamePage
  }
}

export const animalByProductsDestinationPage =
  new AnimalByProductsDestinationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalByProductsDestination = new FmdQuestionPageController(
  animalByProductsDestinationPage
).plugin()
