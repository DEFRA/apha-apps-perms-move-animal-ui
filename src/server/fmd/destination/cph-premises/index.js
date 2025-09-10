import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { checkAnswersPage } from '../check-answers/index.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'cphPremises'

export class CphPremisesPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/cph-number'

  questionKey = questionKey
  sectionKey = 'destination'
  question =
    'What is the county parish holding (CPH) number for the destination premises?'

  Answer = CphNumberAnswer

  nextPage() {
    return checkAnswersPage
  }
}

export const cphPremisesPage = new CphPremisesPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const cphPremises = new FmdQuestionPageController(
  cphPremisesPage
).plugin()
