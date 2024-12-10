import { Page } from '../../common/model/page/page-model.js'
import { Address } from '../../common/model/answer/address.js'
import { PageController } from '../../common/controller/page-controller.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class OriginAddressPage extends QuestionPage {
  urlPath = '/origin/address'
  sectionKey = 'origin'

  question =
    'What is the address of your farm or premises where the animals are moving off?'

  questionKey = 'address'

  view = 'origin/address/index'
  Answer = Address

  /** @param {Address} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    return '/origin/summary'
  }
}

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const address = new PageController(new OriginAddressPage()).plugin()

