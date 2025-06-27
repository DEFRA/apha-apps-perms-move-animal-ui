import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { OtherWildlifeMeasuresAnswer } from '../../../common/model/answer/other-wildlife-measures/other-wildlife-measures.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { biosecuritySummaryPage } from '../check-answers/index.js'

export class OtherWildlifeMeasuresPage extends QuestionPage {
  urlPath = '/biosecurity/other-wildlife-measures'
  sectionKey = 'biosecurity'
  question =
    'What other measures are you taking to reduce the risk of spreading TB?'

  questionKey = 'otherWildlifeMeasures'

  Answer = OtherWildlifeMeasuresAnswer

  nextPage() {
    return biosecuritySummaryPage
  }
}

export const otherWildlifeMeasuresPage = new OtherWildlifeMeasuresPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const otherWildlifeMeasures = new QuestionPageController(
  otherWildlifeMeasuresPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
