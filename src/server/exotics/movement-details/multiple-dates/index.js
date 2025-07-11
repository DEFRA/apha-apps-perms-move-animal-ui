import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'multipleDates'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    rows: 4,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 5_000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message: 'Enter the dates when you expect the movement to take place'
      }
    }
  }
}

export class MultipleDatesPage extends QuestionPage {
  urlPath = '/exotics/movement-details/multiple-dates'

  questionKey = questionKey
  sectionKey = 'movementDetails'
  question =
    'What are the dates for when you expect the movement to take place?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const multipleDatesPage = new MultipleDatesPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const multipleDates = new ExoticsQuestionPageController(
  multipleDatesPage
).plugin()
