import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { maximumJourneysPage } from '../maximum-journeys/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'milkMovementDate'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    hint: 'For example, 7 3 2025',
    validation: {
      missingDate: {
        message: 'Enter the start date of the milk movement'
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

export class MilkMovementDatePage extends QuestionPage {
  urlPath = '/fmd/movement-details/milk-movement-start-date'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'What date does your movement start?'
  view = 'fmd/movement/milk-movement-date/index.njk'

  Answer = Answer

  nextPage() {
    return maximumJourneysPage
  }
}

export const milkMovementDatePage = new MilkMovementDatePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const milkMovementDate = new FmdQuestionPageController(
  milkMovementDatePage
).plugin()
