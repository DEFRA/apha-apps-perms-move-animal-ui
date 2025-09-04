import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { numberKnackermanPage } from '../number-knackerman/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'businessNameKnackerman'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    spellcheck: false,
    validation: {
      empty: {
        message: "Enter the Knackerman's business name"
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class BusinessNameKnackermanPage extends QuestionPage {
  urlPath = '/fmd/slaughter-information/knackerman-business-name'

  questionKey = questionKey
  sectionKey = 'slaughter'
  question = 'What is the business name of the Knackerman?'

  Answer = Answer

  nextPage() {
    return numberKnackermanPage
  }
}

export const businessNameKnackermanPage = new BusinessNameKnackermanPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const businessNameKnackerman = new FmdQuestionPageController(
  businessNameKnackermanPage
).plugin()
