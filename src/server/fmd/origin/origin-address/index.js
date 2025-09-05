import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { mockOriginPage } from '../mock-page/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'originAddress'

export class OriginAddressPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/address'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the origin premises address?'

  Answer = AddressAnswer

  nextPage() {
    return mockOriginPage
  }
}

export const originAddressPage = new OriginAddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const originAddress = new FmdQuestionPageController(
  originAddressPage
).plugin()
