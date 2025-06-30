import { DestinationTypeAnswer } from '~/src/server/common/model/answer/destination-type/destination-type.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { TbQuestionPageController } from '../../question-page-controller.js'
import { destinationGeneralLicencePage } from '../general-licence/index.js'
import { destinationFarmCphPage } from '../destination-farm-cph/index.js'
import { contactTbRestrictedFarmPage } from '../contact-tb-restricted-farm/index.js'
import { isolationUnitExitPage } from '../isolation-unit-exit-page/index.js'
import { additionalInfoPage } from '../additional-info/index.js'
import { afuToAfuExitPage } from '../afu-to-afu-exit-page/index.js'
import { destinationTypeOtherPage } from '../destination-type-other/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { RawApplicationState } from '../../../common/model/state/state-manager.js' */

const offFarmNextPageMapping = {
  'tb-restricted-farm': contactTbRestrictedFarmPage,
  slaughter: destinationGeneralLicencePage,
  'dedicated-sale': additionalInfoPage,
  'iso-unit': isolationUnitExitPage,
  afu: additionalInfoPage,
  zoo: contactTbRestrictedFarmPage,
  lab: contactTbRestrictedFarmPage,
  other: contactTbRestrictedFarmPage
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
    if (context.origin?.onOffFarm === 'on') {
      return this._onFarmNextPage(answer, context)
    } else {
      return this._offFarmNextPage(answer)
    }
  }

  _onFarmNextPage(answer, context) {
    if (context.origin?.originType === 'afu' && answer.value === 'other') {
      return afuToAfuExitPage
    }

    if (answer.value === 'other') {
      return destinationTypeOtherPage
    }

    return destinationFarmCphPage
  }

  _offFarmNextPage(answer) {
    return offFarmNextPageMapping[answer.value]
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
