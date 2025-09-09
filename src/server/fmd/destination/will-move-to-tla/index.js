import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { tlaOrCphNumberPage } from '../tla-or-cph-number/index.js'
import { premisesTypePage } from '../premises-type/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'willMoveToTla'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    isQuestionHeading: false,
    layout: 'inline',
    options: {
      yes: {
        label: 'Yes'
      },
      no: {
        label: 'No'
      }
    },
    validation: {
      empty: 'Select if the destination premises is a TLA'
    }
  }
}

export class WillMoveToTlaPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/TLA-yes-no'
  view = 'fmd/destination/will-move-to-tla/index.njk'
  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Will the animals move on to a temporary land association (TLA)?'

  Answer = Answer

  /**
   * @param {Answer} answer
   */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return tlaOrCphNumberPage
    }
    return premisesTypePage
  }
}

export const willMoveToTlaPage = new WillMoveToTlaPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const willMoveToTla = new FmdQuestionPageController(
  willMoveToTlaPage
).plugin()
