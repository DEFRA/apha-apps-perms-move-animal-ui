import { TbQuestionPageController } from '../../question-page-controller.js'
import { CalvesUnder42DaysOldAnswer } from '../../../common/model/answer/calves-under-42-days-old/calves-under-42-days-old.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { testingDatesPage } from '../testing-dates/index.js'
import { oldestCalfDobPage } from '../oldest-calf-dob/index.js'

export class CalvesUnder42DaysOldPage extends QuestionPage {
  urlPath = '/identification/any-calves'
  sectionKey = 'identification'
  question = 'Will you move any calves under 42 days old?'

  questionKey = 'calvesUnder42DaysOld'
  Answer = CalvesUnder42DaysOldAnswer

  /** @param {CalvesUnder42DaysOldAnswer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return oldestCalfDobPage
    }
    return testingDatesPage
  }
}

export const calvesUnder42DaysOldPage = new CalvesUnder42DaysOldPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const calvesUnder42DaysOld = new TbQuestionPageController(
  calvesUnder42DaysOldPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
