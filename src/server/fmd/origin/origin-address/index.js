import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { checkAnswersPage } from '../check-answers/index.js'
import { gridRefPage } from '../grid-ref/index.js'
import { whatAnimalsPage } from '../what-animals/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'originAddress'

export class OriginAddressPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/address'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the origin premises address?'

  Answer = AddressAnswer

  nextPage(_answer, context) {
    if (context.about.whatIsMoving === 'milk') {
      return checkAnswersPage
    }

    if (
      context.about.movementActivityType === 'slaughter-onsite' ||
      context.about.whatIsMoving === 'carcasses'
    ) {
      return gridRefPage
    }

    return whatAnimalsPage
  }
}

export const originAddressPage = new OriginAddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const originAddress = new FmdQuestionPageController(
  originAddressPage
).plugin()
