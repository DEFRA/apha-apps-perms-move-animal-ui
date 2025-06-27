import { TbQuestionPageController } from '../../question-page-controller.js'
import { TestingDatesAnswer } from '../../../common/model/answer/testing-dates/testing-dates.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { earTagsPage } from '../ear-tags/index.js'

const customHeading = 'Testing dates'

export class TestingDatesPage extends QuestionPage {
  urlPath = '/identification/enter-testing-dates'
  sectionKey = 'identification'
  question =
    'What are the dates of the last TB tests for the cattle that are 42 days old or older?'

  questionKey = 'testingDates'
  Answer = TestingDatesAnswer

  get heading() {
    return customHeading
  }

  view = 'tb/identification/testing-dates/index'

  nextPage() {
    return earTagsPage
  }
}

export const testingDatesPage = new TestingDatesPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const testingDates = new TbQuestionPageController(
  testingDatesPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
