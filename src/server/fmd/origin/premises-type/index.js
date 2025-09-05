import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { mockOriginPage } from '../mock-page/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'premisesType'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      farm: {
        label: 'farm'
      },
      smallholding: {
        label: 'Smallholding or domestic residence',
        hint: 'A smallholding is typically under 50 acres'
      },
      another: {
        label: 'Another premises type'
      }
    },
    validation: {
      empty: 'Select the origin premises type'
    }
  }
}

export class PremisesTypePage extends QuestionPage {
  urlPath = '/fmd/movement-origin/premises-type'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What type of premises is the origin?'

  Answer = Answer

  nextPage() {
    return mockOriginPage
  }
}

export const premisesTypePage = new PremisesTypePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const premisesType = new FmdQuestionPageController(
  premisesTypePage
).plugin()
