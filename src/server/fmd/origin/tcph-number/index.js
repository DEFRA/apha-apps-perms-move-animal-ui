import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { gridRefPage } from '../grid-ref/index.js'
import { whatAnimalsPage } from '../what-animals/index.js'
import { TlaOrTcphNumberAnswer } from '../../common/model/answer/field-parcel-number/tla-tcph-number.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'tlaOrTcphNumber'

export class TcphNumberPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/TLA-or-tCPH-number'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the TLA or temporary county parish holding (tCPH) number?'

  Answer = TlaOrTcphNumberAnswer

  nextPage(_answer, context) {
    if (
      context.about.movementActivityType === 'slaughter-onsite' ||
      context.about.whatIsMoving === 'carcasses'
    ) {
      return gridRefPage
    }

    return whatAnimalsPage
  }
}

export const tcphNumberPage = new TcphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const tcphNumber = new FmdQuestionPageController(tcphNumberPage).plugin()
