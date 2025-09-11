import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { companyTransportingMilkPage } from '../company-transporting-milk/index.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'differentCompanyTransportingMilk'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    layout: 'inline',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    validation: {
      empty: 'Select if a different company will be transporting the milk'
    }
  }
}

export class DifferentCompanyTransportingMilkPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/different-transporting-company-yes-no'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Will a different company be transporting the milk?'

  Answer = Answer

  /** @param { Answer } answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return companyTransportingMilkPage
    }
    return checkAnswersPage
  }
}

export const differentCompanyTransportingMilkPage =
  new DifferentCompanyTransportingMilkPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const differentCompanyTransportingMilk = new FmdQuestionPageController(
  differentCompanyTransportingMilkPage
).plugin()
