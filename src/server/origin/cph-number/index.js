/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

import { Page } from '~/src/server/common/model/page/page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller.js'
import { CphNumber } from '~/src/server/common/model/answer/cph-number.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */

export class CphNumberPage extends Page {
  path = '/cph-number'
  section = 'origin'

  question =
    'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?'

  questionKey = 'cphNumber'

  view = 'origin/cph-number/index'
  Answer = CphNumber

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_cphNumber) {
    return '/origin/address'
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
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphNumber = new PageController(new CphNumberPage()).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
