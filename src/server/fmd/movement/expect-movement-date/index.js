import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'expectMovementDate'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    hint: 'For example, 7 3 2025',
    validation: {
      missingDate: {
        message: 'Enter the start date'
      },
      missingDay: {
        message: 'The milk movement start date must include a day'
      },
      missingMonth: {
        message: 'The milk movement start date must include a month'
      },
      missingYear: {
        message: 'The milk movement start date must include a year'
      },
      invalidDay: {
        message: 'The milk movement start date must be a real date'
      },
      invalidMonth: {
        message: 'The milk movement start date must be a real date'
      },
      invalidYear: {
        message: 'The milk movement start date must be a real date'
      },
      nonFourDigitYear: {
        message: 'The year of milk movement must include 4 numbers'
      },
      invalidDate: {
        message: 'The milk movement start date must be a real date'
      },
      pastDate: {
        message: 'The milk movement start date must be in the future'
      }
    }
  }
}

export class ExpectMovementDatePage extends QuestionPage {
  urlPath = '/fmd/movement-details/milk-movement-dates'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'When is the date when you expect the milk to move?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const expectMovementDatePage = new ExpectMovementDatePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const expectMovementDate = new FmdQuestionPageController(
  expectMovementDatePage
).plugin()
