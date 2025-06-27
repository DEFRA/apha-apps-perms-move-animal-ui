import { TbQuestionPageController } from '../../question-page-controller.js'
import { EarTagsCalvesAnswer } from '../../../common/model/answer/ear-tags/ear-tags-calves.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { animals42DaysOldOrOlderPage } from '../animals-42-days-old-or-older/index.js'

const customHeading = 'Official ear tag numbers for calves under 42 days old'

export class EarTagsCalvesPage extends QuestionPage {
  urlPath = '/identification/enter-ear-tags-calves'
  sectionKey = 'identification'
  question =
    'Enter the ear tag numbers of the calves under 42 days old you are planning to move'

  questionKey = 'earTagsCalves'
  Answer = EarTagsCalvesAnswer

  view = 'tb/identification/ear-tags-calves/index'

  get heading() {
    return customHeading
  }

  nextPage() {
    return animals42DaysOldOrOlderPage
  }
}

export const earTagsCalvesPage = new EarTagsCalvesPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const earTagsCalves = new TbQuestionPageController(
  earTagsCalvesPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
