import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { PeopleDisinfectionAnswer } from '../../common/model/answer/people-disinfection/people-disinfection.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { disinfectantPage } from '../disinfectant/index.js'

export class PeopleDisinfectionPage extends QuestionPage {
  urlPath = '/biosecurity/people-disinfection'
  sectionKey = 'biosecurity'
  question =
    'What measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle?'

  questionKey = 'peopleDisinfection'
  Answer = PeopleDisinfectionAnswer

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
