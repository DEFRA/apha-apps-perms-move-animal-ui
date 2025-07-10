import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { maximumNumberOfJourneysPage } from '../maximum-number-of-journeys/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'reason'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'For example, routine restocking or welfare',
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
  urlPath = '/exotics/movement-details/reason'

  questionKey = questionKey
  sectionKey = 'movementDetails'
  question = 'What is the reason for the movement?'

  Answer = Answer

  nextPage() {
    return maximumNumberOfJourneysPage
  }
}

export const reasonPage = new ReasonPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const reason = new ExoticsQuestionPageController(reasonPage).plugin()
