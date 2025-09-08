import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'destinationContactNumber'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    spellcheck: false,
    characterWidth: 10,
    validation: {
      empty: {
        message: "Enter the destination's contact number"
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class DestinationContactNumberPage extends QuestionPage {
  urlPath = '/fmd/disposal-of-animals/destination-contact-number'

  questionKey = questionKey
  sectionKey = 'disposal'
  question = 'What is the contact phone number for the destination business?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const destinationContactNumberPage = new DestinationContactNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const destinationContactNumber = new FmdQuestionPageController(
  destinationContactNumberPage
).plugin()
