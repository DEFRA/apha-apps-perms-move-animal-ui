/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

import { PageController } from '~/src/server/common/controller/page-controller.js'
import { CphNumber } from '~/src/server/common/model/answer/cph-number.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'

export class CphNumberPage extends QuestionPage{
  urlPath = '/cph-number'
  sectionKey = 'origin'

  question =
    'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?'

  questionKey = 'cphNumber'

  view = 'origin/cph-number/index'
  Answer = CphNumber

  /** @param {CphNumber} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    return '/origin/address'
  }
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphNumber = new PageController(new CphNumberPage()).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
