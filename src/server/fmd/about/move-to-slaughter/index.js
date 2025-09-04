import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { typeOfAnimalsPage } from '../type-of-animals/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'moveToSlaughter'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    layout: 'inline',
    validation: {
      empty: 'Select if the animals are moving to slaughter'
    }
  }
}

export class MoveToSlaughterPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/slaughter-yes-no'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'Are the animals moving to slaughter?'

  Answer = Answer

  nextPage() {
    return typeOfAnimalsPage
  }
}

export const moveToSlaughterPage = new MoveToSlaughterPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const moveToSlaughter = new FmdQuestionPageController(
  moveToSlaughterPage
).plugin()
