import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'abattoirAddress'

export class AbattoirAddressPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/abattoir-address'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the address of the approved abattoir?'

  Answer = AddressAnswer

  nextPage() {
    return checkAnswersPage
  }
}

export const abattoirAddressPage = new AbattoirAddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const abattoirAddress = new FmdQuestionPageController(
  abattoirAddressPage
).plugin()
