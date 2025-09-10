import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { destinationAddressPage } from '../destination-address/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'cphDesignated'

export class CphDesignatedPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/cph-number'

  questionKey = questionKey
  sectionKey = 'destination'
  question =
    'What is the county parish holding (CPH) number of the destination premises?'

  Answer = CphNumberAnswer

  nextPage() {
    return destinationAddressPage
  }
}

export const cphDesignatedPage = new CphDesignatedPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const cphDesignated = new FmdQuestionPageController(
  cphDesignatedPage
).plugin()
