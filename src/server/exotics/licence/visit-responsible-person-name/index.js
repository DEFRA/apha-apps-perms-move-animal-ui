import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { emailOrPostPage } from '../email-or-post/index.js'

/** @import { FullNameConfig } from '~/src/server/common/model/answer/full-name/full-name.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'visitResponsiblePersonName'

export class Answer extends FullNameAnswer {
  /** @type { FullNameConfig } */
  static config = {
    explanationText: 'This is the person we will issue the licence to',
    validation: {
      firstName: {
        empty: {
          message: 'Enter a first name'
        }
      },
      lastName: {
        empty: {
          message: 'Enter a last name'
        }
      }
    }
  }
}

export class VisitResponsiblePersonNamePage extends QuestionPage {
  urlPath = '/exotics/receiving-the-licence/visit/responsible-person-name'

  questionKey = questionKey
  sectionKey = 'licence'
  question = 'Who is responsible for the premises where the visit is happening?'

  Answer = Answer

  nextPage() {
    return emailOrPostPage
  }
}

export const visitResponsiblePersonNamePage =
  new VisitResponsiblePersonNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const visitResponsiblePersonName = new ExoticsQuestionPageController(
  visitResponsiblePersonNamePage
).plugin()
