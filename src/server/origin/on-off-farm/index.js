/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

import { Page } from '~/src/server/common/model/page/page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller.js'
import { OnOffFarm } from '~/src/server/common/model/answer/on-off-farm.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */

export class OnOffFarmPage extends Page {
  path = '/to-or-from-own-premises'
  section = 'origin'

  question = 'Are you moving the cattle on or off your farm or premises?'

  questionKey = 'onOffFarm'

  view = 'origin/on-off-farm/index'
  Answer = OnOffFarm

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage({ onOffFarm }) {
    if (onOffFarm === 'on') {
      return '/exit-page'
    }
    return '/origin/cph-number'
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
export const onOffFarm = new PageController(new OnOffFarmPage()).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
