import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { DilutionRateAnswer } from '../../common/model/answer/dilution-rate/dilution-rate.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { badgersPage } from '../badgers/index.js'

const customHeading = 'Calculate your disinfectant dilution rate'

export class DisinfectantDilutionPage extends QuestionPage {
  view = `biosecurity/disinfectant-dilution/index`

  get heading() {
    return customHeading
  }

  urlPath = '/biosecurity/disinfectant-dilution'
  sectionKey = 'biosecurity'
  question = 'What dilution rate are you using for your disinfectant?'
  questionKey = 'dilutionRate'

  Answer = DilutionRateAnswer

  nextPage() {
    return badgersPage
  }
}

export const disinfectantDilutionPage = new DisinfectantDilutionPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const disinfectantDilution = new QuestionPageController(
  disinfectantDilutionPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
