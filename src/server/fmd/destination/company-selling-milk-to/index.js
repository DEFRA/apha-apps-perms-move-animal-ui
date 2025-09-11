import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { differentCompanyTransportingMilkPage } from '../different-company-transporting-milk/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'companySellingMilkTo'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    spellcheck: false,
    characterWidth: 20,
    validation: {
      empty: {
        message: 'Enter the name of the company you are selling the milk to'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class CompanySellingMilkToPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/milk-selling-company-name'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What company are you selling your milk to?'

  Answer = Answer

  nextPage() {
    return differentCompanyTransportingMilkPage
  }
}

export const companySellingMilkToPage = new CompanySellingMilkToPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const companySellingMilkTo = new FmdQuestionPageController(
  companySellingMilkToPage
).plugin()
