import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { slaughterStubPage } from '../slaughter-stub/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'businessPhone'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    validation: {
      empty: {
        message:
          'Enter the contact phone number for the business providing the Slaughterman'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class BusinessPhonePage extends QuestionPage {
  urlPath = '/fmd/slaughter-information/slaughterman-contact-number'

  questionKey = questionKey
  sectionKey = 'slaughter'
  question =
    'What is the contact phone number for the business providing the Slaughterman?'

  Answer = Answer

  nextPage() {
    return slaughterStubPage
  }
}

export const businessPhonePage = new BusinessPhonePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const businessPhone = new FmdQuestionPageController(
  businessPhonePage
).plugin()
