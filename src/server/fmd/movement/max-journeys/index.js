import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { movementStartPage } from '../movement-start/index.js'

/** @import { NumberConfig } from '~/src/server/common/model/answer/number/number.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'maxJourneys'

export class Answer extends NumberAnswer {
  /** @type { NumberConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    validation: {
      empty: {
        message:
          'Enter the maximum of journeys or consignments needed to move the animals'
      }
    }
  }
}

export class MaxJourneysPage extends QuestionPage {
  urlPath = '/fmd/movement-details/number-of-journeys'

  questionKey = questionKey
  sectionKey = 'movement'
  question =
    'What are the maximum number of journeys or consignments needed to move the animals?'

  Answer = Answer

  nextPage() {
    return movementStartPage
  }
}

export const maxJourneysPage = new MaxJourneysPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const maxJourneys = new FmdQuestionPageController(
  maxJourneysPage
).plugin()
