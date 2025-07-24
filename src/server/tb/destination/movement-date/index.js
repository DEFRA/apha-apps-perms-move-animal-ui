import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { additionalInfoPage } from '../additional-info/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'movementDate'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    hint: 'For example, 7 10 2025',
    validation: {
      invalidDate: {
        message:
          'Date the animals will move off the farm or premises must be a real date'
      },
      missingDate: {
        message: 'Enter the date the animals will move off the farm or premises'
      },
      missingDay: {
        message:
          'Date the animals will move off the farm or premises must include a day'
      },
      missingMonth: {
        message:
          'Date the animals will move off the farm or premises must include a month'
      },
      missingYear: {
        message:
          'Date the animals will move off the farm or premises must include a year'
      },
      invalidDay: {
        message:
          'Day the animals will move off the farm or premises must be a real date'
      },
      invalidMonth: {
        message:
          'Month the animals will move off the farm or premises must be a number between 1 and 12'
      },
      invalidYear: {
        message:
          'Year the animals will move off the farm or premises must be a real date'
      },
      nonFourDigitYear: {
        message:
          'Year the animals will move off the farm or premises must be a real date'
      },
      pastDate: {
        message: 'Date of movement must be today or after'
      }
    }
  }
}

export class MovementDatePage extends QuestionPage {
  urlPath = '/destination/any-additional-info'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What date will the animals move off the farm or premises?'

  Answer = Answer

  nextPage() {
    return additionalInfoPage
  }
}

export const movementDatePage = new MovementDatePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const movementDate = new TbQuestionPageController(
  movementDatePage
).plugin()
