import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { animalsOnPremisesPage } from '../animals-on-premises/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'isDesignatedPremises'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'A designated premises has government approval to undertake certain animal-related activities, such as moving eggs.',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' },
      unknown: { label: "I don't know" }
    },
    validation: {
      empty: 'Enter what animals are on the premises'
    }
  }
}

export class IsDesignatedPremisesPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/designated-premise'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'Is the premises designated?'

  Answer = Answer

  nextPage() {
    return animalsOnPremisesPage
  }
}

export const isDesignatedPremisesPage = new IsDesignatedPremisesPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const isDesignatedPremises = new ExoticsQuestionPageController(
  isDesignatedPremisesPage
).plugin()
