import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { mockOriginPage } from '../mock-page/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'cphNumber'

export class CphNumberPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/cph-number'

  questionKey = questionKey
  sectionKey = 'origin'
  question =
    'What is the county parish holding (CPH) number of the origin premises?'

  Answer = CphNumberAnswer

  nextPage() {
    return mockOriginPage
  }
}

export const cphNumberPage = new CphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const cphNumber = new FmdQuestionPageController(cphNumberPage).plugin()
