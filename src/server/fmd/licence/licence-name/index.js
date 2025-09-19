import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { emailAddressPage } from '../email-address/index.js'

/** @import { FullNameConfig } from '~/src/server/common/model/answer/full-name/full-name.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'licenceName'

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

export class LicenceNamePage extends QuestionPage {
  urlPath = '/fmd/receiving-the-licence/licencee-name'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'Who should we issue the licence to?'

  Answer = Answer

  nextPage() {
    return emailAddressPage
  }
}

export const licenceNamePage = new LicenceNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const licenceName = new FmdQuestionPageController(
  licenceNamePage
).plugin()
