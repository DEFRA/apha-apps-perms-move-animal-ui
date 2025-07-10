import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { inRpaRegisteredFieldPage } from '../in-rpa-registered-field/index.js'
import { animalsOnPremisesPage } from '../animals-on-premises/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'address'

export class AddressPage extends QuestionPage {
  urlPath = '/exotics/location-of-visit/address'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question = 'What is the address of where the visit will take place?'

  Answer = AddressAnswer

  nextPage(_answer, context) {
    if (context.locationOfVisit.typeOfLocation === 'domestic-residence') {
      return inRpaRegisteredFieldPage
    }

    return animalsOnPremisesPage
  }
}

export const addressPage = new AddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const address = new ExoticsQuestionPageController(addressPage).plugin()
