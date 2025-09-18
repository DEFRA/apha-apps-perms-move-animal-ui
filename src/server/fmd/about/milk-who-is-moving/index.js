import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { milkAnimalPage } from '../milk-animal/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'milkWhoIsMoving'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      producer: { label: `I'm a producer moving my own milk` },
      dairy: { label: `I'm a dairy collecting from multiple producers` }
    },
    validation: {
      empty: 'Select who is moving the milk'
    }
  }
}

export class MilkWhoIsMovingPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/producer'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'Who is moving the milk?'

  Answer = Answer

  nextPage() {
    return milkAnimalPage
  }
}

export const milkWhoIsMovingPage = new MilkWhoIsMovingPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const milkWhoIsMoving = new FmdQuestionPageController(
  milkWhoIsMovingPage
).plugin()
