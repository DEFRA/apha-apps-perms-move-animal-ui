import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { EarTagsAnswer } from '../../common/model/answer/ear-tags/ear-tags.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { cattleOver42DaysPage } from '../cattle-over-42-days-old/index.js'

const customHeading = 'Official ear tag numbers for calves under 42 days old'

export class EarTagsCalvesPage extends QuestionPage {
  urlPath = '/identification/enter-ear-tags-calves'
  sectionKey = 'identification'
  question =
    'Enter the ear tag numbers of the calves under 42 days old you are planning to move'

  questionKey = 'earTagsCalves'
  Answer = EarTagsAnswer

  view = 'identification/ear-tags-calves/index'

  get heading() {
    return customHeading
  }

  nextPage() {
    return cattleOver42DaysPage
  }
}

export const earTagsCalvesPage = new EarTagsCalvesPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const earTagsCalves = new QuestionPageController(
  earTagsCalvesPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
