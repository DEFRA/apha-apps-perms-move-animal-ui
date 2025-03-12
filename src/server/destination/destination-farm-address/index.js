import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { AddressAnswer } from '../../common/model/answer/address/address.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { howManyAnimalsPage } from '../max-number-of-animals/index.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'
import { destinationSummaryPage } from '../summary/index.js'

/**
 * @import { AnswerModel } from '../../common/model/answer/answer-model.js'
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class DestinationFarmAddressPage extends QuestionPage {
  urlPath = '/destination/destination-farm-address'
  sectionKey = 'destination'
  question =
    'What is the address of the farm or premises where the animals are going to?'

  questionKey = 'destinationFarmAddress'

  Answer = AddressAnswer

  /**
   * @param {AnswerModel} _answer
   * @param {import('../../common/model/state/state-manager.js').RawApplicationState} context
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer, context) {
    if (context.origin?.onOffFarm === 'on') {
      if (
        context.origin?.originType === 'market' ||
        context.origin?.originType === 'unrestricted-farm'
      ) {
        return howManyAnimalsPage
      } else {
        return reasonForMovementPage
      }
    } else {
      return destinationSummaryPage
    }
  }
}

export const destinationFarmAddressPage = new DestinationFarmAddressPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationFarmAddress = new QuestionPageController(
  destinationFarmAddressPage
).plugin()
