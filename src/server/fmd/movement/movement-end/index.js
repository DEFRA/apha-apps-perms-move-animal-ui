import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'movementEnd'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    hint: 'For example, 7 3 2025',
    validation: {
      missingDate: {
        message: 'Enter the movement start date'
      },
      missingDay: {
        message: 'Movement end date must include a day'
      },
      missingMonth: {
        message: 'Movement end date must include a month'
      },
      missingYear: {
        message: 'Movement end date must include a year'
      },
      invalidDay: { message: 'Movement end day must be a real date' },
      invalidMonth: {
        message: 'Movement end month must be a number between 1 and 12'
      },
      invalidYear: { message: 'Movement end year must be a real date' },
      nonFourDigitYear: {
        message: 'Movement end year must include 4 numbers'
      },
      invalidDate: {
        message: 'Movement end date must be a real date'
      },
      pastDate: {
        message: 'Movement end date must be in the future'
      }
    }
  }
}

export class MovementEndPage extends QuestionPage {
  urlPath = '/fmd/movement-details/end-date'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'What date does your movement end?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const movementEndPage = new MovementEndPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const movementEnd = new FmdQuestionPageController(
  movementEndPage
).plugin()
