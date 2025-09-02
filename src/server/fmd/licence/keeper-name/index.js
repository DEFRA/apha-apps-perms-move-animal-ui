import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { LicenceFullNameAnswer } from '../../common/model/answer/licence-full-name/licence-full-name.js'
import { emailPage } from '../email/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'keeperName'

export class KeeperNamePage extends QuestionPage {
  urlPath = '/fmd/receiving-the-licence/keeper-name'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'What is the name of the current keeper of the animals?'

  Answer = LicenceFullNameAnswer

  nextPage() {
    return emailPage
  }
}

export const keeperNamePage = new KeeperNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const keeperName = new FmdQuestionPageController(keeperNamePage).plugin()
