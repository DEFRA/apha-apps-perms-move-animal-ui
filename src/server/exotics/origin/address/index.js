import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { areInFieldPage } from '../are-in-field/index.js'
import { checkAnswersPage } from '../check-answers/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 */

const questionKey = 'address'

export class AddressPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/address'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What is the origin premises address?'

  Answer = AddressAnswer

  /**
   * @param {AddressAnswer} _answer
   * @param {RawApplicationState} context
   */
  nextPage(_answer, context) {
    if (
      context.about?.whatIsMoving === 'live-animals' &&
      context.origin?.typeOfAnimalLocation !== 'domestic-residence'
    ) {
      return areInFieldPage
    }
    return checkAnswersPage
  }
}

export const addressPage = new AddressPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const address = new ExoticsQuestionPageController(addressPage).plugin()
