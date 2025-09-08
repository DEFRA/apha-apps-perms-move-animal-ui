import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { mockMovementDetailsPage } from '../mock-page/index.js'

/** @import { NumberConfig } from '~/src/server/common/model/answer/number/number.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'maximumDaysAnimals'

export class Answer extends NumberAnswer {
  /** @type { NumberConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    validation: {
      empty: {
        message: 'Enter the maximum number of days needed to move the animals'
      }
    }
  }
}

export class MaximumDaysAnimalsPage extends QuestionPage {
  urlPath = '/fmd/movement-details/number-of-days'

  questionKey = questionKey
  sectionKey = 'movementDetails'
  question = 'What are the maximum number of days needed to move the animals?'

  Answer = Answer

  nextPage() {
    return mockMovementDetailsPage
  }
}

export const maximumDaysAnimalsPage = new MaximumDaysAnimalsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const maximumDaysAnimals = new FmdQuestionPageController(
  maximumDaysAnimalsPage
).plugin()
