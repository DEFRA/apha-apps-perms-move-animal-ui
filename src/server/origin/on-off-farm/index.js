/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

import { PageController } from '~/src/server/common/controller/page-controller.js'
import { OnOffFarm } from '~/src/server/common/model/answer/on-off-farm.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */

export class OnOffFarmPage extends QuestionPage {
  path = '/to-or-from-own-premises'
  section = 'origin'

  question = 'Are you moving the cattle on or off your farm or premises?'

  questionKey = 'onOffFarm'

  view = 'origin/on-off-farm/index'
  Answer = OnOffFarm

  /** @param {OnOffFarm} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'on') {
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
