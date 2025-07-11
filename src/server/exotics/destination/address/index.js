import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { responsiblePersonNamePage } from '../responsible-person-name/index.js'
import { cphNumberKnownPage } from '../cph-number-known/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

const questionKey = 'address'

export class AddressPage extends QuestionPage {
  urlPath = '/exotics/movement-destination/address'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the destination address?'

  Answer = AddressAnswer

  /**
   * @param {AddressAnswer} _answer
   * @param {RawApplicationState} context
   */
  nextPage(_answer, context) {
    if (
      context.about?.whatIsMoving === 'live-animals' &&
      ['pigs', 'sheep-and-goats', 'cattle'].includes(
        context.about?.typeOfAnimal
      )
    ) {
      return cphNumberKnownPage
    }

    return responsiblePersonNamePage
  }
}

export const addressPage = new AddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const address = new ExoticsQuestionPageController(addressPage).plugin()
