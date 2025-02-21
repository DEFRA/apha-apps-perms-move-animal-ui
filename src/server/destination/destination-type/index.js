import { DestinationTypeAnswer } from '~/src/server/common/model/answer/destination-type/destination-type.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { anotherDestinationPage } from '~/src/server/destination/another-destination/index.js'
import { destinationSummaryPage } from '../summary/index.js'
import { destinationGeneralLicencePage } from '../general-licence/index.js'
import { ownFarmDestinationCphPage } from '../own-farm-destination-cph/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { AnswerModel } from "~/src/server/common/model/answer/answer-model.js" */
/** @import { RawApplicationState } from '../../common/model/state/state-manager.js' */

const offFarmNextPageMapping = {
  slaughter: destinationGeneralLicencePage,
  'dedicated-sale': destinationSummaryPage,
  afu: destinationSummaryPage,
  other: anotherDestinationPage
}

export class DestinationTypePage extends QuestionPage {
  urlPath = '/destination/type-of-destination'
  sectionKey = 'destination'
  question = 'Where are the animals going to?'
  questionKey = 'destinationType'

  Answer = DestinationTypeAnswer

  /**
   * @param {AnswerModel} answer
   * @param {RawApplicationState} context
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer, context) {
    if (context.origin?.onOffFarm === 'on') {
      return ownFarmDestinationCphPage
    } else {
      return offFarmNextPageMapping[answer.value] ?? anotherDestinationPage
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
