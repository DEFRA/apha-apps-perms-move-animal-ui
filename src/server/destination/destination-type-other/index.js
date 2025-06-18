import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { DestinationTypeOtherAnswer } from '../../common/model/answer/destination-type-other/destination-type-other.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { destinationFarmCphPage } from '../destination-farm-cph/index.js'

export class DestinationTypeOtherPage extends QuestionPage {
  urlPath = '/destination/type-of-origin-other'
  sectionKey = 'destination'
  questionKey = 'destinationTypeOther'
  question =
    'What type of premises with TB restrictions are the animals moving off?'

  Answer = DestinationTypeOtherAnswer

  nextPage() {
    return destinationFarmCphPage
  }
}

export const destinationTypeOtherPage = new DestinationTypeOtherPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationTypeOther = new QuestionPageController(
  destinationTypeOtherPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
