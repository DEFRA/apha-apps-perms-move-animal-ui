import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'slaughterDate'
const invalidEntryError = 'Slaughter date must be a real date'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    hint: 'For example, 7 3 2030',
    validation: {
      missingDate: {
        message: 'Enter the date you expect the slaughter to take place'
      },
      missingDay: {
        message: 'Expected slaughter date must include a day'
      },
      missingMonth: {
        message: 'Expected slaughter date must include a month'
      },
      missingYear: {
        message: 'Expected slaughter date must include a year'
      },
      invalidDay: { message: invalidEntryError },
      invalidMonth: {
        message: invalidEntryError
      },
      invalidYear: { message: invalidEntryError },
      nonFourDigitYear: {
        message: 'Year must include 4 numbers'
      },
      invalidDate: { message: 'Slaughter date must be a real date' },
      pastDate: {
        message: 'Expected slaughter date must be in the future'
      }
    }
  }
}

export class SlaughterDatePage extends QuestionPage {
  urlPath = '/fmd/slaughter-information/date-of-slaughter'

  questionKey = questionKey
  sectionKey = 'slaughter'
  question = 'What date do you expect the slaughter to take place?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const slaughterDatePage = new SlaughterDatePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const slaughterDate = new FmdQuestionPageController(
  slaughterDatePage
).plugin()
