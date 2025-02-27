import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { PeopleDisinfectionAnswer } from '../../common/model/answer/people-disinfection/people-disinfection.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { disinfectantPage } from '../disinfectant/index.js'

const customHeading = 'Cleaning and disinfection measures taken by staff'

export class PeopleDisinfectionPage extends QuestionPage {
  urlPath = '/biosecurity/people-disinfection'
  sectionKey = 'biosecurity'
  question =
    'What measures are staff taking to reduce the risk of spreading TB from the resident cattle?'

  questionKey = 'peopleDisinfection'
  Answer = PeopleDisinfectionAnswer

  view = 'biosecurity/people-disinfection/index'

  get heading() {
    return customHeading
  }

  nextPage() {
    return disinfectantPage
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
