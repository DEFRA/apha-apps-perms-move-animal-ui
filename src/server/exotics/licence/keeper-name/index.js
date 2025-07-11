import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { emailOrPostPage } from '../email-or-post/index.js'
import { LicenceFullNameAnswer } from '../../common/model/answer/licence-full-name/licence-full-name.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'keeperName'

export class KeeperNamePage extends QuestionPage {
  urlPath = '/exotics/receiving-the-licence/keeper-name'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'What is the name of the current keeper of the animals?'

  Answer = LicenceFullNameAnswer

  nextPage() {
    return emailOrPostPage
  }
}

export const keeperNamePage = new KeeperNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const keeperName = new ExoticsQuestionPageController(
  keeperNamePage
).plugin()
