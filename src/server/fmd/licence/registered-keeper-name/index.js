import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { emailAddressPage } from '../email-address/index.js'

/** @import { FullNameConfig } from '~/src/server/common/model/answer/full-name/full-name.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'registeredKeeperName'

export class Answer extends FullNameAnswer {
  /** @type { FullNameConfig } */
  static config = {
    explanation: 'This is the person we will issue the licence to',
    validation: {
      firstName: {
        empty: {
          message:
            'Enter the first name of the registered keeper of the animals'
        }
      },
      lastName: {
        empty: {
          message: 'Enter the last name of the registered keeper of the animals'
        }
      }
    }
  }
}

export class RegisteredKeeperNamePage extends QuestionPage {
  urlPath = '/fmd/receiving-the-licence/name-of-registered-keeper'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'Who is the registered keeper of the animals?'

  Answer = Answer

  nextPage() {
    return emailAddressPage
  }
}

export const registeredKeeperNamePage = new RegisteredKeeperNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const registeredKeeperName = new FmdQuestionPageController(
  registeredKeeperNamePage
).plugin()
