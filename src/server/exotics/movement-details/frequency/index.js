import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { maximumNumberOfJourneysPage } from '../maximum-number-of-journeys/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'frequency'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      regular: { label: 'Regular movement' },
      'one-off': { label: 'One-off movement' }
    },
    validation: {
      empty: 'Select the frequency of the movement'
    }
  }
}

export class FrequencyPage extends QuestionPage {
  urlPath = '/exotics/movement-details/frequency'

  questionKey = questionKey
  sectionKey = 'movementDetails'
  question = 'How frequent is the movement?'

  Answer = Answer

  nextPage() {
    return maximumNumberOfJourneysPage
  }
}

export const frequencyPage = new FrequencyPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const frequency = new ExoticsQuestionPageController(
  frequencyPage
).plugin()
