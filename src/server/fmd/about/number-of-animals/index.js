import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { animalIdsPage } from '../animal-ids/index.js'

/** @import { NumberConfig } from '~/src/server/common/model/answer/number/number.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'numberOfAnimals'
const min = 1
const max = 5000

export class Answer extends NumberAnswer {
  /** @type { NumberConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    validation: {
      empty: {
        message: 'Enter how many animals you are planning to move'
      },
      max: { value: max, message: `Enter a number ${max} or below` },
      min: { value: min, message: `Enter a number ${min} or above` }
    }
  }
}

export class NumberOfAnimalsPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/number-of-animals'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'How many animals are you planning to move?'

  Answer = Answer

  nextPage() {
    return animalIdsPage
  }
}

export const numberOfAnimalsPage = new NumberOfAnimalsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const numberOfAnimals = new FmdQuestionPageController(
  numberOfAnimalsPage
).plugin()
