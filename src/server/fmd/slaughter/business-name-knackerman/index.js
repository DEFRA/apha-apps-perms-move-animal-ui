import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { slaughterStubPage } from '../slaughter-stub/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'businessNameKnackerman'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 20,
    spellcheck: false,
    validation: {
      empty: {
        message:
          'Enter the contact phone number for the business providing the Knackerman'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class BusinessNameKnackermanPage extends QuestionPage {
  urlPath = '/fmd/slaughter-information/knackerman-contact-number'

  questionKey = questionKey
  sectionKey = 'slaughter'
  question = 'What is the business name of the Knackerman?'

  Answer = Answer

  nextPage() {
    return slaughterStubPage
  }
}

export const businessNameKnackermanPage = new BusinessNameKnackermanPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const businessNameKnackerman = new FmdQuestionPageController(
  businessNameKnackermanPage
).plugin()
