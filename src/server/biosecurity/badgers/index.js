import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { BadgersAnswer } from '../../common/model/answer/badgers/badgers.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { biosecuritySummaryPage } from '../check-answers/index.js'

export class BadgersPage extends QuestionPage {
  view = `biosecurity/badgers/index`

  urlPath = '/biosecurity/badgers'
  sectionKey = 'biosecurity'
  question =
    'Which measures are you taking to reduce contamination from wildlife?'

  questionKey = 'badgers'
  Answer = BadgersAnswer

  nextPage() {
    return biosecuritySummaryPage
  }
}

export const badgersPage = new BadgersPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const badgers = new QuestionPageController(badgersPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
