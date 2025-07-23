import { TbQuestionPageController } from '../../question-page-controller.js'
import { AddressAnswer } from '../../../common/model/answer/address/address.js'
import { OriginTypeAnswer } from '../../../common/model/answer/origin-type/origin-type.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { howManyAnimalsMaximumPage } from '../how-many-animals-maximum/index.js'
import { howManyAnimalsPage } from '../how-many-animals/index.js'

/**
 * @import { AnswerModel } from '../../../common/model/answer/answer-model.js'
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
   * @param {import('../../../common/model/state/state-manager.js').RawApplicationState} context
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer, context) {
    if (
      (context.origin?.onOffFarm === 'on' &&
        OriginTypeAnswer.isTbRestricted(context.origin?.originType)) ||
      (context.origin?.onOffFarm === 'off' &&
        context.origin?.originType === 'iso-unit')
    ) {
      return howManyAnimalsPage
    }

    return howManyAnimalsMaximumPage
  }
}

export const destinationFarmAddressPage = new DestinationFarmAddressPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationFarmAddress = new TbQuestionPageController(
  destinationFarmAddressPage
).plugin()
