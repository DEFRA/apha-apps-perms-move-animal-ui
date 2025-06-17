import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { cphNumberPage } from '~/src/server/origin/cph-number/index.js'
import { OriginTypeAnswer } from '../../common/model/answer/origin-type/origin-type.js'
import { countryPage } from '../country/index.js'
import { originFarmCphPage } from '../origin-farm-cph/index.js'
import { fiftyPercentWarningPage } from '../fifty-percent-warning/index.js'
import { originContactTbRestrictedFarmPage } from '../contact-tb-restricted-farm/index.js'
import { originTypeOtherPage } from '../origin-type-other/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { RawApplicationState } from '../../common/model/state/state-manager.js' */

export class OriginTypePage extends QuestionPage {
  urlPath = '/origin/type-of-origin'
  sectionKey = 'origin'
  question = 'What type of premises are the animals moving off?'
  questionKey = 'originType'

  Answer = OriginTypeAnswer

  /**
   * @param {OriginTypeAnswer} answer
   * @param {RawApplicationState} context
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer, context) {
    const isOnFarm = context.origin?.onOffFarm === 'on'

    switch (true) {
      case isOnFarm && answer.value === 'market':
      case isOnFarm && answer.value === 'unrestricted-farm':
        return fiftyPercentWarningPage
      case isOnFarm && answer.value === 'after-import-location':
        return countryPage
      case !isOnFarm && answer.value === 'unrestricted-farm':
        return originContactTbRestrictedFarmPage
      case answer.value === 'other':
        return originTypeOtherPage
      case isOnFarm:
        return originFarmCphPage
      default:
        return cphNumberPage
    }
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
