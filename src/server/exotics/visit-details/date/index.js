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
        message: 'Enter the expected visit date'
      },
      missingDay: {
        message: 'Expected visit date must include a day'
      },
      missingMonth: {
        message: 'Expected visit date must include a month'
      },
      missingYear: {
        message: 'Expected visit date must include a year'
      },
      invalidDay: {
        message: 'Expected visit day must be a real date'
      },
      invalidMonth: {
        message: 'Expected visit month must be a number between 1 and 12'
      },
      invalidYear: {
        message: 'Expected visit year must be a real date'
      },
      nonFourDigitYear: {
        message: 'Expected visit year must include 4 numbers'
      },
      invalidDate: {
        message: 'Expected visit date must be a real date'
      }
    }
  }
}

export class DatePage extends QuestionPage {
  urlPath = '/exotics/visit-details/date'

  questionKey = questionKey
  sectionKey = 'visitDetails'
  question = 'When do you expect the visit to happen?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const datePage = new DatePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const date = new ExoticsQuestionPageController(datePage).plugin()
