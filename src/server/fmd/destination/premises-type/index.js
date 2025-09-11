import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { cphDesignatedPage } from '../cph-designated/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'premisesType'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      farm: { label: 'Farm' },
      commercial: { label: 'Commercial holding or premises' },
      smallholding: { label: 'Smallholding or domestic residence' },
      other: { label: 'Another location' }
    },
    validation: {
      empty: 'Select the destination premises type'
    }
  }
}

export class PremisesTypePage extends QuestionPage {
  urlPath = '/fmd/movement-destination/premises-type'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Where are the animals going to?'

  Answer = Answer

  nextPage() {
    return cphDesignatedPage
  }
}

export const premisesTypePage = new PremisesTypePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const premisesType = new FmdQuestionPageController(
  premisesTypePage
).plugin()
