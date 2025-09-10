import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { NumberConfig } from '~/src/server/common/model/answer/number/number.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'maximumJourneysMilk'

export class Answer extends NumberAnswer {
  /** @type { NumberConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    validation: {
      empty: {
        message:
          'Enter the maximum number of journeys needed to move the milk in the 2 week period'
      },
      min: {
        value: 1,
        message:
          'The number of journeys needed to move the milk within a 2 week period must be 1 or more'
      },
      max: {
        value: 999,
        message:
          'The number of journeys needed to move the milk within a 2 week period must be 999 or lower'
      }
    }
  }
}

export class MaximumJourneysMilkPage extends QuestionPage {
  urlPath = '/fmd/movement-details/milk-maximum-journeys'

  questionKey = questionKey
  sectionKey = 'movement'
  question =
    'What are the maximum number of journeys needed to move the milk over the 2 week period?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const maximumJourneysMilkPage = new MaximumJourneysMilkPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const maximumJourneysMilk = new FmdQuestionPageController(
  maximumJourneysMilkPage
).plugin()
