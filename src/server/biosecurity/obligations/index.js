import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { BiosecurityObligationsAnswer } from '../../common/model/answer/biosecurity-obligations/biosecurity-obligations.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { keptSeparatelyPage } from '../kept-separately/index.js'

export class ObligationsPage extends QuestionPage {
  urlPath = '/biosecurity/biosecurity-intro'
  sectionKey = 'biosecurity'
  question = 'Biosecurity on your farm or premises'
  questionKey = 'biosecurityObligationsAcknowledged'
  view = 'biosecurity/obligations/index.njk'
  isInterstitial = true

  Answer = BiosecurityObligationsAnswer

  nextPage() {
    return keptSeparatelyPage
  }
}

export const obligationsPage = new ObligationsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const obligations = new QuestionPageController(obligationsPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
