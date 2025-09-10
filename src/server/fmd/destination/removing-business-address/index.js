import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { destinationHasACphNumberPage } from '../destination-has-a-cph-number/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'removingBusinessAddress'

export class RemovingBusinessAddressPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/removing-business-address'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the address of the business removing the carcasses?'

  Answer = AddressAnswer

  nextPage() {
    return destinationHasACphNumberPage
  }
}

export const removingBusinessAddressPage = new RemovingBusinessAddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const removingBusinessAddress = new FmdQuestionPageController(
  removingBusinessAddressPage
).plugin()
