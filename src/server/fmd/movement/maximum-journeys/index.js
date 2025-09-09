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
      }
    }
  }
}

export class MaximumJourneysPage extends QuestionPage {
  urlPath = '/fmd/movement-details/maximum-journeys'

  questionKey = questionKey
  sectionKey = 'movement'
  question =
    'What are the maximum number of journeys needed to move the milk over the 2 week period?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const maximumJourneysPage = new MaximumJourneysPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const maximumJourneys = new FmdQuestionPageController(
  maximumJourneysPage
).plugin()
