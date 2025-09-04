import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { slaughteredNumberPage } from '../slaughtered-number/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalSlaughtered'

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
      empty: 'Select the type of animal being slaughtered'
    }
  }
}

export class AnimalSlaughteredPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/animal-being-slaughtered'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'Which type of animal will be slaughtered?'

  Answer = Answer

  nextPage() {
    return slaughteredNumberPage
  }
}

export const animalSlaughteredPage = new AnimalSlaughteredPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalSlaughtered = new FmdQuestionPageController(
  animalSlaughteredPage
).plugin()
