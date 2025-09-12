import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { premisesTypePage } from '../premises-type/index.js'
import { TlaOrTcphNumberAnswer } from '../../common/model/answer/field-parcel-number/tla-tcph-number.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'tlaOrTcphNumber'

export class TlaOrCphNumberPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/TLA-or-tCPH-number'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the TLA or temporary county parish holding (tCPH) number?'

  Answer = TlaOrTcphNumberAnswer

  nextPage() {
    return premisesTypePage
  }
}

export const tlaOrCphNumberPage = new TlaOrCphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const tlaOrCphNumber = new FmdQuestionPageController(
  tlaOrCphNumberPage
).plugin()
