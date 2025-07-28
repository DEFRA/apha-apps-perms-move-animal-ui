/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { originAddressPage } from '../address/index.js'
import { TbQuestionPageController } from '../../question-page-controller.js'

export class CphNumberPage extends QuestionPage {
  urlPath = '/origin/cph-number'
  sectionKey = 'origin'

  question =
    'What is the county parish holding (CPH) number of your farm or premises where the animals are moving off?'

  questionKey = 'cphNumber'

  Answer = CphNumberAnswer

  /** @param {CphNumberAnswer} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    return originAddressPage
  }
}
export const cphNumberPage = new CphNumberPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphNumber = new TbQuestionPageController(cphNumberPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
