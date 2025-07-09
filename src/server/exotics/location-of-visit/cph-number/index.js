import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { addressPage } from '../address/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'cphNumber'

export class CphNumberPage extends QuestionPage {
  urlPath = '/exotics/location-of-visit/cph-number'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question = 'What is the CPH number for premises where the visit is happening?'

  Answer = CphNumberAnswer

  nextPage() {
    return addressPage
  }
}

export const cphNumberPage = new CphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const cphNumber = new ExoticsQuestionPageController(
  cphNumberPage
).plugin()
