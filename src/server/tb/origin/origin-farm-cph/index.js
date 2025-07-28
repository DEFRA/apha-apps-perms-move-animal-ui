/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'
import { originFarmAddressPage } from '../origin-farm-address/index.js'

export class OriginFarmCphPage extends QuestionPage {
  urlPath = '/origin/origin-farm-cph'
  sectionKey = 'origin'

  question =
    'What is the county parish holding (CPH) number of the farm or premises where the animals are moving off?'

  questionKey = 'cphNumber'

  Answer = CphNumberAnswer

  /** @param {CphNumberAnswer} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    return originFarmAddressPage
  }
}
export const originFarmCphPage = new OriginFarmCphPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originFarmCph = new TbQuestionPageController(
  originFarmCphPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
