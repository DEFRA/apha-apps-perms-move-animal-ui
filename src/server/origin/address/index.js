import { Page } from '../../common/model/page/page-model.js'
import { Address } from '../../common/model/answer/address.js'
import { PageController } from '../../common/controller/page-controller.js'

/** @import { AnswerErrors } from "../../common/model/answer/validation.js" */

export class OriginAddressPage extends Page {
  path = '/address'
  section = 'origin'

  question =
    'What is the address of your farm or premises where the animals are moving off?'

  questionKey = 'address'

  view = 'origin/address/index'
  Answer = Address

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_address) {
    return '/origin/summary'
  }

  /** @param {AnswerErrors} errors */
  errorMessages(errors) {
    return Object.entries(errors).map(([key, value]) => ({
      text: value.text,
      href: `#${key}`
    }))
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

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
