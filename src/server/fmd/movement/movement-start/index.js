import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { movementEndPage } from '../movement-end/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'movementStart'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    isPageHeading: false,
    hint: 'For example, 7 3 2025',
    validation: {
      missingDate: {
        message: 'Enter the movement start date'
      },
      missingDay: {
        message: 'Movement start date must include a day'
      },
      missingMonth: {
        message: 'Movement start date must include a month'
      },
      missingYear: {
        message: 'Movement start date must include a year'
      },
      invalidDay: { message: 'Movement start day must be a real date' },
      invalidMonth: {
        message: 'Movement start month must be a number between 1 and 12'
      },
      invalidYear: { message: 'Movement start year must be a real date' },
      nonFourDigitYear: {
        message: 'Movement start year must include 4 numbers'
      },
      invalidDate: {
        message: 'Movement start date must be a real date'
      },
      pastDate: {
        message: 'Movement start date must be in the future'
      }
    }
  }
}

export class MovementStartPage extends QuestionPage {
  urlPath = '/fmd/movement-details/start-date'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'What date does your movement start?'
  view = 'fmd/movement/movement-start/index.njk'

  Answer = Answer

  viewProps() {
    return Promise.resolve({
      heading: 'Movement dates'
    })
  }

  nextPage() {
    return movementEndPage
  }
}

export const movementStartPage = new MovementStartPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const movementStart = new FmdQuestionPageController(
  movementStartPage
).plugin()
