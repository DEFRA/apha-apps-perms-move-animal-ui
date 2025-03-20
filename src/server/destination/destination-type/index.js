import { DestinationTypeAnswer } from '~/src/server/common/model/answer/destination-type/destination-type.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { destinationSummaryPage } from '../summary/index.js'
import { destinationGeneralLicencePage } from '../general-licence/index.js'
import { destinationFarmCphPage } from '../destination-farm-cph/index.js'
import { contactTbRestrictedFarmPage } from '../contact-tb-restricted-farm/index.js'
import { destinationNotSupportedPage } from '../not-supported-movement-type/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { AnswerModel } from "~/src/server/common/model/answer/answer-model.js" */
/** @import { RawApplicationState } from '../../common/model/state/state-manager.js' */

const offFarmNextPageMapping = {
  'tb-restricted-farm': contactTbRestrictedFarmPage,
  slaughter: destinationGeneralLicencePage,
  'dedicated-sale': destinationSummaryPage,
  afu: destinationSummaryPage,
  zoo: contactTbRestrictedFarmPage,
  lab: contactTbRestrictedFarmPage,
  other: contactTbRestrictedFarmPage
}

export const restricted = ['tb-restricted-farm', 'zoo'] // origin
export const possibleRestricted = restricted.concat(['lab', 'other']) // destination

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
    if (
      context.origin?.onOffFarm === 'on' &&
      restricted.includes(context.origin?.originType) &&
      possibleRestricted.includes(answer.value)
    ) {
      return destinationNotSupportedPage
    } else if (context.origin?.onOffFarm === 'on') {
      return destinationFarmCphPage
    } else {
      return offFarmNextPageMapping[answer.value]
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

export const destinationTypePage = new DestinationTypePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationType = new QuestionPageController(
  new DestinationTypePage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
