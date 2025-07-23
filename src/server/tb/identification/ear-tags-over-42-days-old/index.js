import { TbQuestionPageController } from '../../question-page-controller.js'
import { EarTagsAnswer } from '../../../common/model/answer/ear-tags/ear-tags.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { identificationSummaryPage } from '../summary/index.js'

const customHeading =
  'Official ear tag numbers for animals 42 days old or older'

export class EarTagsOver42DaysOldPage extends QuestionPage {
  urlPath = '/identification/enter-ear-tags-over-42-days'
  sectionKey = 'identification'
  question = 'Enter the ear tag numbers for these animals'
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

export const earTagsOver42DaysOldPage = new EarTagsOver42DaysOldPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const earTagsOver42DaysOld = new TbQuestionPageController(
  earTagsOver42DaysOldPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
