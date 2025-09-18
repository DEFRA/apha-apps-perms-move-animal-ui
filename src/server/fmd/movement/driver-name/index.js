import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { driverPhonePage } from '../driver-phone/index.js'

/** @import { FullNameConfig } from '~/src/server/common/model/answer/full-name/full-name.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'driverName'

export class Answer extends FullNameAnswer {
  /** @type { FullNameConfig } */
  static config = {
    validation: {
      firstName: {
        empty: {
          message: 'Enter the first name of the vehicle driver'
        }
      },
      lastName: {
        empty: {
          message: 'Enter the last name of the vehicle driver'
        }
      }
    }
  }
}

export class DriverNamePage extends QuestionPage {
  urlPath = '/fmd/movement-details/driver-name'

  questionKey = questionKey
  sectionKey = 'movement'
  question = "What is the vehicle driver's name?"

  Answer = Answer

  nextPage() {
    return driverPhonePage
  }
}

export const driverNamePage = new DriverNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const driverName = new FmdQuestionPageController(driverNamePage).plugin()
