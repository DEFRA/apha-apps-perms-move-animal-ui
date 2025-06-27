/**
 * Sets up the routes used in the on off farm page.
 * These routes are registered in src/server/router.js.
 */

import { OnOffFarmAnswer } from '~/src/server/common/model/answer/on-off-farm/on-off-farm.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'
import { originTypePage } from '../origin-type/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { AnswerModel } from "~/src/server/common/model/answer/answer-model.js" */

export class OnOffFarmPage extends QuestionPage {
  urlPath = '/origin/to-or-from-own-premises'
  sectionKey = 'origin'

  question = 'Are you moving the animals on or off your farm or premises?'

  questionKey = 'onOffFarm'

  Answer = OnOffFarmAnswer

  nextPage() {
    return originTypePage
  }

  /** @param {AnswerErrors} errors */
  errorMessages(errors) {
    return Object.entries(errors).map(([key, value]) => ({
      text: value.text,
      href: `#${key}`
    }))
  }
}

export const onOffFarmPage = new OnOffFarmPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const onOffFarm = new TbQuestionPageController(
  new OnOffFarmPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
