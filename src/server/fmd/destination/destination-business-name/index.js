import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { destinationBusinessPhonePage } from '../destination-business-phone/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'destinationBusinessName'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 20,
    spellcheck: false,
    validation: {
      empty: {
        message: 'Enter the name of the destination business'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class DestinationBusinessNamePage extends QuestionPage {
  urlPath = '/fmd/movement-destination/business-name'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the name of the destination business?'

  Answer = Answer

  nextPage() {
    return destinationBusinessPhonePage
  }
}

export const destinationBusinessNamePage = new DestinationBusinessNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const destinationBusinessName = new FmdQuestionPageController(
  destinationBusinessNamePage
).plugin()
