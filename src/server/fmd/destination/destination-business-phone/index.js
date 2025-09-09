import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { destinationAddressKnownPage } from '../destination-address-known/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'destinationBusinessPhone'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    spellcheck: false,
    validation: {
      empty: {
        message: 'Enter the contact number for the destination business'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class DestinationBusinessPhonePage extends QuestionPage {
  urlPath = '/fmd/movement-destination/contact-number'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the contact phone number for the destination business?'

  Answer = Answer

  nextPage() {
    return destinationAddressKnownPage
  }
}

export const destinationBusinessPhonePage = new DestinationBusinessPhonePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const destinationBusinessPhone = new FmdQuestionPageController(
  destinationBusinessPhonePage
).plugin()
