import { DestinationTypeAnswer } from '~/src/server/common/model/answer/destination-type/destination-type.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { anotherDestinationPage } from '~/src/server/destination/another-destination/index.js'
import { destinationSummaryPage } from '../summary/index.js'
import { destinationGeneralLicencePage } from '../general-licence/index.js'

/** @import { AnswerErrors } from "~/src/server/common/model/answer/validation.js" */
/** @import { AnswerModel } from "~/src/server/common/model/answer/answer-model.js" */

export class DestinationTypePage extends QuestionPage {
  urlPath = '/destination/type-of-destination'
  sectionKey = 'destination'
  question = 'Where are the animals going to?'
  questionKey = 'destinationType'
  view = 'destination/destination-type/index'

  Answer = DestinationTypeAnswer

  /** @param {AnswerModel} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    const nextPageMapping = {
      slaughter: destinationGeneralLicencePage,
      'dedicated-sale': destinationSummaryPage,
      afu: destinationSummaryPage,
      other: anotherDestinationPage
    }
    return nextPageMapping[answer.value] ?? anotherDestinationPage
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
