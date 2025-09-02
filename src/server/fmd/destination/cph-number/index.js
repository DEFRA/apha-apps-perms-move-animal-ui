import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { responsiblePersonNamePage } from '../responsible-person-name/index.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'cphNumber'

export class CphNumberPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/cph-number'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the CPH number for the destination premises?'

  Answer = CphNumberAnswer

  nextPage() {
    return responsiblePersonNamePage
  }
}

export const cphNumberPage = new CphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const cphNumber = new FmdQuestionPageController(cphNumberPage).plugin()
