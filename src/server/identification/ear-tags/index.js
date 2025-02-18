import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { EarTagsAnswer } from '../../common/model/answer/ear-tags/ear-tags.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { identificationSummaryPage } from '../check-answers/index.js'

export class EarTagsPage extends QuestionPage {
  urlPath = '/identification/enter-ear-tags'
  sectionKey = 'identification'
  question = 'Enter the ear tag numbers of the animals you are planning to move'
  questionKey = 'earTags'
  Answer = EarTagsAnswer

  /** @param {EarTagsAnswer} _answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(_answer) {
    return identificationSummaryPage
  }
}

export const earTagsPage = new EarTagsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const earTags = new QuestionPageController(earTagsPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
