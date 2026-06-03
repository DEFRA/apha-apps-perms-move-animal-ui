import { DestinationTypeAnswer } from '~/src/server/common/model/answer/destination-type/destination-type.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'
import { destinationGeneralLicencePage } from '../general-licence/index.js'
import { destinationFarmCphPage } from '../destination-farm-cph/index.js'
import { checkExistingLicenceExitPage } from '../check-existing-licence-exit-page/index.js'
import { additionalInfoPage } from '../additional-info/index.js'
import { afuOnlyOffExitPage } from '../afu-only-off-exit-page/index.js'
import { destinationTypeOtherPage } from '../destination-type-other/index.js'
import { afuOnlyOnExitPage } from '../afu-only-on-exit-page/index.js'
import { destinationFarmAddressPage } from '../destination-farm-address/index.js'
import { ownBothOriginAndDestinationPage } from '../own-both-origin-and-destination/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { RawApplicationState } from '../../../common/model/state/state-manager.js' */

const offFarmNextPageMapping = {
  'tb-restricted-farm': ownBothOriginAndDestinationPage,
  slaughter: destinationGeneralLicencePage,
  'dedicated-sale': additionalInfoPage,
  'iso-unit': checkExistingLicenceExitPage,
  'afu-or-market': additionalInfoPage,
  zoo: ownBothOriginAndDestinationPage,
  lab: ownBothOriginAndDestinationPage,
  other: ownBothOriginAndDestinationPage
}

export class DestinationTypePage extends QuestionPage {
  urlPath = '/destination/type-of-destination'
  sectionKey = 'destination'
  question = 'Where are the animals going to?'
  questionKey = 'destinationType'

  Answer = DestinationTypeAnswer

  /**
   * @param {DestinationTypeAnswer} answer
   * @param {RawApplicationState} context
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer, context) {
    const origin = context?.origin
    const originType = origin?.originType
    const destType = answer.value
    if (origin?.onOffFarm === 'on') {
      return this._onFarmNextPage(originType, destType)
    } else {
      return this._offFarmNextPage(originType, destType)
    }
  }

  _onFarmNextPage(originType, destType) {
    // Origin AFU
    if (originType === 'afu') {
      if (destType === 'other') {
        return afuOnlyOnExitPage
      }
      if (destType === 'afu-or-market') {
        return destinationFarmCphPage
      }
    }

    // Origin NOT AFU
    if (destType === 'other') {
      return destinationTypeOtherPage
    }
    if (originType === 'unrestricted-farm' && destType === 'afu') {
      return checkExistingLicenceExitPage
    }

    return destinationFarmCphPage
  }

  _offFarmNextPage(originType, destType) {
    if (originType === 'afu') {
      if (destType === 'slaughter') {
        return checkExistingLicenceExitPage
      }
      if (destType === 'other') {
        return afuOnlyOffExitPage
      }
    }

    if (originType === 'iso-unit' && destType === 'slaughter') {
      return destinationFarmAddressPage
    }

    if (originType === 'iso-unit' && destType === 'afu') {
      return destinationFarmCphPage
    }

    if (destType === 'afu-or-market') {
      return additionalInfoPage
    }

    return offFarmNextPageMapping[destType]
  }

  /** @param {AnswerErrors} errors */
  errorMessages(errors) {
    return Object.entries(errors).map(([key, value]) => ({
      text: value.text,
      href: `#${key}`
    }))
  }
}

export const destinationTypePage = new DestinationTypePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationType = new TbQuestionPageController(
  new DestinationTypePage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
