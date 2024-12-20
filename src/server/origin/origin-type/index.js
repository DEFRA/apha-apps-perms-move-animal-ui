/**
 * Sets up the routes used in the origin type page.
 * These routes are registered in src/server/router.js.
 */

import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { cphNumberPage } from '~/src/server/origin/cph-number/index.js'
import { OriginTypeAnswer } from '../../common/model/answer/origin-type/origin-type.js'
import { exitPageOriginType } from '../exit-page-origin-type/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { AnswerModel } from "~/src/server/common/model/answer/answer-model.js" */

export class OriginTypePage extends QuestionPage {
  urlPath = '/origin/type-of-origin'
  sectionKey = 'origin'
  question = 'What type of premises are the animals moving off?'
  questionKey = 'originType'

  view = 'origin/origin-type/index'
  Answer = OriginTypeAnswer

  /** @param {AnswerModel} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'other') {
      return exitPageOriginType
    }
    return cphNumberPage
  }

  /** @param {AnswerErrors} errors */
  errorMessages(errors) {
    return Object.entries(errors).map(([key, value]) => ({
      text: value.text,
      href: `#${key}`
    }))
  }
}

export const originTypePage = new OriginTypePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originType = new QuestionPageController(
  new OriginTypePage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
