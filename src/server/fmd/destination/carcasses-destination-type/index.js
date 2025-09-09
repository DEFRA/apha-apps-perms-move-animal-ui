import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { carcassesSomewhereElseExitPage } from '../carcasses-somewhere-else/index.js'
import { applicantMovingCarcassesPage } from '../applicant-moving-carcasses/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'carcassesDestinationType'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      'knackers-yard': { label: "Knacker's yard" },
      'rendering-plant': { label: 'Rendering Plant' },
      incinerator: { label: 'Incinerator' },
      'hunt-kennel': { label: 'Hunt kennel' },
      'somewhere-else': { label: 'Somewhere else' }
    },
    validation: {
      empty: 'Select where the carcasses are going'
    }
  }
}

export class CarcassesDestinationTypePage extends QuestionPage {
  urlPath = '/fmd/movement-destination/type'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Where are the carcasses going?'

  Answer = Answer

  /**
   * @param {Answer} answer
   */
  nextPage(answer) {
    if (answer.value === 'somewhere-else') {
      return carcassesSomewhereElseExitPage
    }
    return applicantMovingCarcassesPage
  }
}

export const carcassesDestinationTypePage = new CarcassesDestinationTypePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const carcassesDestinationType = new FmdQuestionPageController(
  carcassesDestinationTypePage
).plugin()
