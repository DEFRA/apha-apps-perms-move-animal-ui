import { KeptSeparatelyAnswer } from '~/src/server/common/model/answer/kept-separately/kept-separately.js'
import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { TbQuestionPageController } from '~/src/server/tb/question-page-controller.js'
import { grazingPage } from '../grazing/index.js'
import { manureAndSlurryDetailsPage } from '../manure-and-slurry-details/index.js'

/** @import { AnswerModel } from "~/src/server/common/model/answer/answer-model.js" */

export class KeptSeparatelyPage extends QuestionPage {
  urlPath = '/biosecurity/kept-separately'
  sectionKey = 'biosecurity'
  question = 'Will you separate the incoming cattle from the resident herd?'
  questionKey = 'keptSeparately'
  Answer = KeptSeparatelyAnswer

  /** @param {KeptSeparatelyAnswer} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'yes') {
      return grazingPage
    }
    return manureAndSlurryDetailsPage
  }
}

export const keptSeparatelyPage = new KeptSeparatelyPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const keptSeparately = new TbQuestionPageController(
  keptSeparatelyPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
