import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { frequencyPage } from '../frequency/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'reason'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'For example, for slaughter or moving for selling purposes',
    spellcheck: true,
    rows: 4,
    validation: {
      empty: {
        message: 'Enter the reason for the movement'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      }
    }
  }
}

export class ReasonPage extends QuestionPage {
  urlPath = '/fmd/movement-details/reason'

  questionKey = questionKey
  sectionKey = 'movementDetails'
  question = 'What is the reason for the movement?'

  Answer = Answer

  nextPage() {
    return frequencyPage
  }
}

export const reasonPage = new ReasonPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const reason = new FmdQuestionPageController(reasonPage).plugin()
