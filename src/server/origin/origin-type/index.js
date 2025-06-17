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

    if (isOnFarm) {
      return this._handleOnFarmChange(answer)
    } else {
      return this._handleOffFarmChange(answer)
    }
  }

  /**
   * Function to handle logic that only looks at one condition
   */
  _handleAnswerOnly(answer, isOnFarm) {
    if (answer.value === 'other') {
      return originTypeOtherPage
    } else if (isOnFarm) {
      return originFarmCphPage
    } else {
      return cphNumberPage
    }
  }

  /**
   * Function to handle logic for when the animals are moving off the farm
   * plus another condition (eg answer value)
   */
  _handleOffFarmChange(answer) {
    if (answer.value === 'unrestricted-farm') {
      return originContactTbRestrictedFarmPage
    } else {
      return this._handleAnswerOnly(answer, false)
    }
  }

  /**
   * Function to handle logic for when the animals are moving on to the farm
   * plus another condition (eg answer value)
   */
  _handleOnFarmChange(answer) {
    if (answer.value === 'market' || answer.value === 'unrestricted-farm') {
      return fiftyPercentWarningPage
    } else if (answer.value === 'after-import-location') {
      return countryPage
    } else {
      return this._handleAnswerOnly(answer, true)
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
