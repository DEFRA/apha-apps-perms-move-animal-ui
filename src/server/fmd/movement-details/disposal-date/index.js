import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'disposalDate'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    isPageHeading: false,
    hint: 'For example, 7 3 2025',
    validation: {
      missingDate: {
        message: 'Enter the date you expect the disposal to take place'
      },
      missingDay: {
        message: 'Disposal date must include a day'
      },
      missingMonth: {
        message: 'Disposal date must include a month'
      },
      missingYear: {
        message: 'Disposal date must include a year'
      },
      invalidDay: { message: 'Disposal day must be a real date' },
      invalidMonth: {
        message: 'Disposal month must be a number between 1 and 12'
      },
      invalidYear: { message: 'Disposal year must be a real date' },
      nonFourDigitYear: {
        message: 'Disposal year must include 4 numbers'
      },
      invalidDate: {
        message: 'Disposal date must be a real date'
      },
      pastDate: {
        message: 'Disposal date must be in the future'
      }
    }
  }
}

export class DisposalDatePage extends QuestionPage {
  urlPath = '/fmd/movement-details/disposal-date'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'What date do you expect the disposal to take place?'
  view = 'fmd/movement-details/disposal-date/index.njk'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const disposalDatePage = new DisposalDatePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const disposalDate = new FmdQuestionPageController(
  disposalDatePage
).plugin()
