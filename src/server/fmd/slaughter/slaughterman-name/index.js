import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { slaughterStubPage } from '../slaughter-stub/index.js'

/** @import { FullNameConfig } from '~/src/server/common/model/answer/full-name/full-name.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'slaughtermanName'

export class Answer extends FullNameAnswer {
  /** @type { FullNameConfig } */
  static config = {
    validation: {
      firstName: {
        empty: {
          message: 'Enter first name'
        }
      },
      lastName: {
        empty: {
          message: 'Enter last name'
        }
      }
    }
  }
}

export class SlaughtermanNamePage extends QuestionPage {
  urlPath = '/fmd/slaughter-information/name'

  questionKey = questionKey
  sectionKey = 'slaughter'
  question = 'What is the name of the Slaughterman?'

  Answer = Answer

  nextPage() {
    return slaughterStubPage
  }
}

export const slaughtermanNamePage = new SlaughtermanNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const slaughtermanName = new FmdQuestionPageController(
  slaughtermanNamePage
).plugin()
