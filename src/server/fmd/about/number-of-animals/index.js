import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { currentPurposeOfAnimalsPage } from '../current-purpose-of-animals/index.js'

/** @import { NumberConfig } from '~/src/server/common/model/answer/number/number.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'numberOfAnimals'

export class Answer extends NumberAnswer {
  /** @type { NumberConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 4,
    validation: {
      empty: {
        message: 'Enter how many animals you are planning to move'
      },
      min: {
        value: 1,
        message: 'Enter a number 1 or above'
      },
      max: {
        value: 1000,
        message: 'Enter a number 1000 or below'
      }
    }
  }
}

export class NumberOfAnimalsPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement/what-is-moving/select-animals/quantity'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'How many animals are you planning to move?'

  Answer = Answer

  nextPage() {
    return currentPurposeOfAnimalsPage
  }
}

export const numberOfAnimalsPage = new NumberOfAnimalsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const numberOfAnimals = new FmdQuestionPageController(
  numberOfAnimalsPage
).plugin()
