import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { DisinfectantAnswer } from '../../../common/model/answer/disinfectant/disinfectant.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { disinfectantDilutionPage } from '../disinfectant-dilution/index.js'

const customHeading = 'Disinfectant'

export class DisinfectantPage extends QuestionPage {
  view = `tb/biosecurity/disinfectant/index`

  get heading() {
    return customHeading
  }

  urlPath = '/biosecurity/disinfectant'
  sectionKey = 'biosecurity'
  question = 'What disinfectant are you using?'
  questionKey = 'disinfectant'

  Answer = DisinfectantAnswer

  nextPage() {
    return disinfectantDilutionPage
  }
}

export const disinfectantPage = new DisinfectantPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const disinfectant = new QuestionPageController(
  disinfectantPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
