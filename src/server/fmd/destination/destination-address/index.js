import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'destinationAddress'

export class DestinationAddressPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/address'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the destination premises address?'

  Answer = AddressAnswer

  nextPage() {
    return checkAnswersPage
  }
}

export const destinationAddressPage = new DestinationAddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const destinationAddress = new FmdQuestionPageController(
  destinationAddressPage
).plugin()
