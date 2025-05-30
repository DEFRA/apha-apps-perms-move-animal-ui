import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { PeopleDisinfectionAnswer } from '../../common/model/answer/people-disinfection/people-disinfection.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { badgersPage } from '../badgers/index.js'
import { otherStaffMeasuresPage } from '../other-staff-measures/index.js'

export class PeopleDisinfectionPage extends QuestionPage {
  urlPath = '/biosecurity/people-disinfection'
  sectionKey = 'biosecurity'
  question =
    'Which measures are staff taking to reduce the risk of spreading TB?'

  questionKey = 'peopleDisinfection'
  Answer = PeopleDisinfectionAnswer

  /** @param {PeopleDisinfectionAnswer} answer */
  nextPage(answer) {
    if (answer.value?.includes('other')) {
      return otherStaffMeasuresPage
    } else {
      return badgersPage
    }
  }
}

export const peopleDisinfectionPage = new PeopleDisinfectionPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const peopleDisinfection = new QuestionPageController(
  peopleDisinfectionPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
