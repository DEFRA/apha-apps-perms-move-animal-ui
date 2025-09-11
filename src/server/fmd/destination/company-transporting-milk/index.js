import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'companyTransportingMilk'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 20,
    spellcheck: false,
    validation: {
      empty: { message: 'Enter the name of the company transporting the milk' },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class CompanyTransportingMilkPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/milk-transporting-company-name'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the name of the company transporting the milk?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const companyTransportingMilkPage = new CompanyTransportingMilkPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const companyTransportingMilk = new FmdQuestionPageController(
  companyTransportingMilkPage
).plugin()
