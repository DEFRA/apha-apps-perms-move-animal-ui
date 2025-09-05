import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'milkAnimal'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      cow: { label: 'Cow' },
      sheep: { label: 'Sheep' },
      goat: { label: 'Goat' },
      another: { label: 'Another animal' }
    },
    validation: {
      empty: 'Select what animal the milk or product is from'
    }
  }
}

export class MilkAnimalPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/animal-the-milk-is-from'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What animal is the milk or product from?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const milkAnimalPage = new MilkAnimalPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const milkAnimal = new FmdQuestionPageController(milkAnimalPage).plugin()
