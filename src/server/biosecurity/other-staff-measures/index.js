import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { OtherStaffMeasuresAnswer } from '../../common/model/answer/other-staff-measures/other-staff-measures.js'
import { badgersPage } from '../badgers/index.js'

export class OtherStaffMeasuresPage extends QuestionPage {
  urlPath = '/biosecurity/other-staff-measures'
  sectionKey = 'biosecurity'
  question =
    'What other measures are staff taking to reduce the risk of spreading TB?'

  questionKey = 'otherStaffMeasures'

  Answer = OtherStaffMeasuresAnswer

  nextPage() {
    return badgersPage
  }
}

export const otherStaffMeasuresPage = new OtherStaffMeasuresPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const otherStaffMeasures = new QuestionPageController(
  otherStaffMeasuresPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
