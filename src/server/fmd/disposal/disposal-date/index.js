import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { animalByProductsDestinationPage } from '../animal-by-products-destination/index.js'
import { carcassesDestinationPage } from '../carcasses-destination/index.js'

/** @import { DateConfig } from '~/src/server/common/model/answer/date/date.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

const questionKey = 'disposalDate'
const customHeading = 'Disposal date'

export class Answer extends DateAnswer {
  /** @type { DateConfig } */
  static config = {
    isPageHeading: false,
    hint: 'For example, 7 3 2025',
    validation: {
      missingDate: {
        message: 'Enter the disposal date'
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
  urlPath = '/fmd/disposal-of-animal/date-of-disposal'

  questionKey = questionKey
  sectionKey = 'disposal'
  question = 'What date do you expect the disposal to take place?'
  view = 'fmd/disposal/disposal-date/index.njk'

  get heading() {
    return customHeading
  }

  Answer = Answer

  /**
   * @param {Answer} answer
   * @param {RawApplicationState} context
   */
  nextPage(answer, context) {
    if (context.disposal.disposalWholeAnimal === 'yes') {
      return carcassesDestinationPage
    }
    return animalByProductsDestinationPage
  }
}

export const disposalDatePage = new DisposalDatePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const disposalDate = new FmdQuestionPageController(
  disposalDatePage
).plugin()
