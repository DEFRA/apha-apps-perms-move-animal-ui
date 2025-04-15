import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { Animals42DaysOldOrOlderAnswer } from '../../common/model/answer/animals-42-days-old-or-older/animals-42-days-old-or-older.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { identificationSummaryPage } from '../summary/index.js'
import { testingDatesPage } from '../testing-dates/index.js'

export class Animals42DaysOldOrOlderPage extends QuestionPage {
  sectionKey = 'identification'
  urlPath = `/${this.sectionKey}/any-cattle-over-42-days`
  question = 'Are you also moving any animals 42 days old or older?'

  questionKey = 'animals42DaysOldOrOlder'
  Answer = Animals42DaysOldOrOlderAnswer

  nextPage(answer) {
    if (answer.value === 'yes') {
      return testingDatesPage
    }
    return identificationSummaryPage
  }
}

export const animals42DaysOldOrOlderPage = new Animals42DaysOldOrOlderPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const animals42DaysOldOrOlder = new QuestionPageController(
  animals42DaysOldOrOlderPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
