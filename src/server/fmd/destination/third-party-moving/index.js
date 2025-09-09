import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { destinationBusinessNamePage } from '../destination-business-name/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'thirdPartyMoving'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 20,
    spellcheck: false,
    validation: {
      empty: {
        message: 'Enter the name of the third party moving the carcasses'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class ThirdPartyMovingPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/transporting-business-name'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the name of the third party moving the carcasses?'

  Answer = Answer

  nextPage() {
    return destinationBusinessNamePage
  }
}

export const thirdPartyMovingPage = new ThirdPartyMovingPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const thirdPartyMoving = new FmdQuestionPageController(
  thirdPartyMovingPage
).plugin()
