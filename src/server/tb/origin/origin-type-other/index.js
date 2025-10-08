import { TbQuestionPageController } from '../../question-page-controller.js'
import { OriginTypeOtherAnswer } from '../../../common/model/answer/origin-type-other/origin-type-other.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { originFarmCphPage } from '../origin-farm-cph/index.js'
import { cphNumberPage } from '../cph-number/index.js'

export class OriginTypeOtherPage extends QuestionPage {
  urlPath = '/origin/type-of-origin-other'
  sectionKey = 'origin'
  questionKey = 'originTypeOther'
  question =
    'What type of premises with TB restrictions are the animals moving off?'

  Answer = OriginTypeOtherAnswer

  nextPage(_answer, context) {
    if (context.origin?.onOffFarm === 'off') {
      return cphNumberPage
    }

    return originFarmCphPage
  }
}

export const originTypeOtherPage = new OriginTypeOtherPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originTypeOther = new TbQuestionPageController(
  originTypeOtherPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
