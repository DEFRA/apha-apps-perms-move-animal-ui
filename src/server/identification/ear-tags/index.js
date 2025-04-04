import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { EarTagsAnswer } from '../../common/model/answer/ear-tags/ear-tags.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { identificationSummaryPage } from '../summary/index.js'

const customHeading =
  'Official ear tag numbers for animals 42 days old or older'

export class EarTagsPage extends QuestionPage {
  urlPath = '/identification/enter-ear-tags'
  sectionKey = 'identification'
  question = 'Enter the ear tag numbers for these animals'
  questionKey = 'earTags'
  Answer = EarTagsAnswer

  get heading() {
    return customHeading
  }

  view = 'identification/ear-tags/index'

  nextPage() {
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
