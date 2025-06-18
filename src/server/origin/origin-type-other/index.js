import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { OriginTypeOtherAnswer } from '../../common/model/answer/origin-type-other/origin-type-other.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { originFarmCphPage } from '../origin-farm-cph/index.js'

export class OriginTypeOtherPage extends QuestionPage {
  urlPath = '/origin/type-of-origin-other'
  sectionKey = 'origin'
  questionKey = 'originTypeOther'
  question =
    'What type of premises with TB restrictions are the animals moving off?'

  Answer = OriginTypeOtherAnswer

  nextPage() {
    return originFarmCphPage
  }
}

export const originTypeOtherPage = new OriginTypeOtherPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originTypeOther = new QuestionPageController(
  originTypeOtherPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
