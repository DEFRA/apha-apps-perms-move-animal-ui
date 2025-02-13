import { KeptSeparatelyAnswer } from '~/src/server/common/model/answer/kept-separately/kept-separately.js'
import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { QuestionPageController } from '~/src/server/common/controller/question-page-controller/question-page-controller.js'
import { grazingPage } from '../grazing/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'

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
    return peopleDisinfectionPage
  }
}

export const keptSeparatelyPage = new KeptSeparatelyPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const keptSeparately = new QuestionPageController(
  keptSeparatelyPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
