import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'date'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    hint: 'For example, 7 3 2025',
    validation: {
      missingDate: {
        message: 'Enter the expected movement date'
      },
      missingDay: {
        message: 'Expected movement date must include a day'
      },
      missingMonth: {
        message: 'Expected movement date must include a month'
      },
      missingYear: {
        message: 'Expected movement date must include a year'
      },
      invalidDay: {
        message: 'Expected movement day must be a real date'
      },
      invalidMonth: {
        message: 'Expected movement month must be a number between 1 and 12'
      },
      invalidYear: {
        message: 'Expected movement year must be a real date'
      },
      nonFourDigitYear: {
        message: 'Expected movement year must include 4 numbers'
      },
      invalidDate: {
        message: 'Expected movement date must be a real date'
      }
    }
  }
}

export class DatePage extends QuestionPage {
  urlPath = '/exotics/movement-details/date'

  questionKey = questionKey
  sectionKey = 'movementDetails'
  question = 'When do you expect the movement to happen?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const datePage = new DatePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const date = new ExoticsQuestionPageController(datePage).plugin()
