import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { cphNumberPage } from '~/src/server/origin/cph-number/index.js'
import { OriginTypeAnswer } from '../../common/model/answer/origin-type/origin-type.js'
import { exitPagePremisesType } from '../premises-type-exit-page/index.js'
import { countryPage } from '../country/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { AnswerModel } from "~/src/server/common/model/answer/answer-model.js" */
/** @import { RawApplicationState } from '../../common/model/state/state-manager.js' */

export class OriginTypePage extends QuestionPage {
  urlPath = '/origin/type-of-origin'
  sectionKey = 'origin'
  question = 'What type of premises are the animals moving off?'
  questionKey = 'originType'

  Answer = OriginTypeAnswer

  /**
   * @param {AnswerModel} answer
   * @param {RawApplicationState} context
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer, context) {
    if (answer.value === 'after-import-location') {
      return countryPage
    }
    if (answer.value === 'other') {
      return exitPagePremisesType
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
