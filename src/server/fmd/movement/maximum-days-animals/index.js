import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { maxJourneysPage } from '../max-journeys/index.js'

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
      },
      wholeNumberRequired: {
        message:
          'The maximum number of days needed to move the animals must be a whole number'
      },
      min: {
        value: 1,
        message:
          'The maximum number of days needed to move the animals must be 1 or higher'
      },
      max: {
        value: 999,
        message:
          'The number of journeys needed to move the animals within a 2 week period must be 999 days or lower'
      }
    }
  }
}

export class MaximumDaysAnimalsPage extends QuestionPage {
  urlPath = '/fmd/movement-details/number-of-days'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'What are the maximum number of days needed to move the animals?'

  Answer = Answer

  nextPage() {
    return maxJourneysPage
  }
}

export const maximumDaysAnimalsPage = new MaximumDaysAnimalsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const maximumDaysAnimals = new FmdQuestionPageController(
  maximumDaysAnimalsPage
).plugin()
