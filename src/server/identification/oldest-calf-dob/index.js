import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { CalfDob } from '../../common/model/answer/calf-dob/calf-dob.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { earTagsCalvesPage } from '../ear-tags-calves/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class OldestCalfDobPage extends QuestionPage {
  urlPath = '/identification/oldest-calf-dob'
  sectionKey = 'identification'
  question = 'What is the date of birth of the oldest calf under 42 days old?'
  questionKey = 'oldestCalfDob'

  Answer = CalfDob

  nextPage() {
    return earTagsCalvesPage
  }
}

export const oldestCalfDobPage = new OldestCalfDobPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const oldestCalfDob = new QuestionPageController(
  oldestCalfDobPage
).plugin()
