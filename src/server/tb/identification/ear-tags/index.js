import { TbQuestionPageController } from '../../question-page-controller.js'
import { EarTagsAnswer } from '../../../common/model/answer/ear-tags/ear-tags.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { identificationSummaryPage } from '../summary/index.js'

const customHeading = 'Official ear tag numbers for animals being moved'

export class EarTagsPage extends QuestionPage {
  urlPath = '/identification/enter-ear-tags'
  sectionKey = 'identification'
  question = 'Enter the ear tag numbers'
  questionKey = 'earTags'
  Answer = EarTagsAnswer

  get heading() {
    return customHeading
  }

  view = 'tb/identification/ear-tags/index'

  nextPage() {
    return identificationSummaryPage
  }
}

export const earTagsPage = new EarTagsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const earTags = new TbQuestionPageController(earTagsPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
