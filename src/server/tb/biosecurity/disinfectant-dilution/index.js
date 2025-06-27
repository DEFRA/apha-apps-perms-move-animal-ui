import { TbQuestionPageController } from '../../question-page-controller.js'
import { DilutionRateAnswer } from '../../../common/model/answer/dilution-rate/dilution-rate.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'

const customHeading = 'Calculate your disinfectant dilution rate'

export class DisinfectantDilutionPage extends QuestionPage {
  view = `tb/biosecurity/disinfectant-dilution/index`

  get heading() {
    return customHeading
  }

  urlPath = '/biosecurity/disinfectant-dilution'
  sectionKey = 'biosecurity'
  question = 'What dilution rate are you using for your disinfectant?'
  questionKey = 'dilutionRate'

  Answer = DilutionRateAnswer

  nextPage() {
    return buildingsAnySharedPage
  }
}

export const disinfectantDilutionPage = new DisinfectantDilutionPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const disinfectantDilution = new TbQuestionPageController(
  disinfectantDilutionPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
