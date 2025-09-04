import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { numberOfAnimalsPage } from '../number-of-animals/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfAnimals'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      cattle: { label: 'Cattle' },
      sheep: { label: 'Sheep' },
      goats: { label: 'Goats' },
      pigs: { label: 'Pigs' },
      camelids: { label: 'Camelids (such as llamas and alpacas)' }
    },
    validation: {
      empty: 'Select the type of animal you are moving'
    }
  }
}

export class TypeOfAnimalsPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/animal-type'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'Which type of animal are you moving?'

  Answer = Answer

  nextPage() {
    return numberOfAnimalsPage
  }
}

export const typeOfAnimalsPage = new TypeOfAnimalsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfAnimals = new FmdQuestionPageController(
  typeOfAnimalsPage
).plugin()
