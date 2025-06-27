import {
  TbQuestionPageController
} from '../../question-page-controller.js'
import { CphNumberAnswer } from '../../../common/model/answer/cph-number/cph-number.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { destinationFarmAddressPage } from '../destination-farm-address/index.js'

export class DestinationFarmCphPage extends QuestionPage {
  urlPath = '/destination/destination-farm-cph'
  sectionKey = 'destination'
  question =
    'What is the County Parish Holding (CPH) number of the farm or premises where the animals are going to?'

  questionKey = 'destinationFarmCph'

  Answer = CphNumberAnswer

  nextPage() {
    return destinationFarmAddressPage
  }
}

export const destinationFarmCphPage = new DestinationFarmCphPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationFarmCph = new TbQuestionPageController(
  destinationFarmCphPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
