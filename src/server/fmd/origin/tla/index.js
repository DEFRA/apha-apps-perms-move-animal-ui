import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { premisesTypePage } from '../premises-type/index.js'
import { tcphNumberPage } from '../tcph-number/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'tla'

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
      empty: 'Select if the origin premises is a TLA'
    }
  }
}

export class TlaPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/TLA-yes-no'
  view = 'fmd/origin/tla/index.njk'
  questionKey = questionKey
  sectionKey = 'origin'
  question = 'Is the origin premises a TLA?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value === 'no') {
      return premisesTypePage
    }
    return tcphNumberPage
  }
}

export const tlaPage = new TlaPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const tla = new FmdQuestionPageController(tlaPage).plugin()
