import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { FullNameConfig } from '~/src/server/common/model/answer/full-name/full-name.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'responsiblePersonName'

export class Answer extends FullNameAnswer {
  /** @type { FullNameConfig } */
  static config = {
    validation: {
      firstName: {
        empty: { message: 'Enter a first name' }
      },
      lastName: {
        empty: { message: 'Enter a last name' }
      }
    }
  }
}

export class ResponsiblePersonNamePage extends QuestionPage {
  urlPath = '/fmd/movement-destination/responsible-person-name'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Who is responsible for the destination premises?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const responsiblePersonNamePage = new ResponsiblePersonNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const responsiblePersonName = new FmdQuestionPageController(
  responsiblePersonNamePage
).plugin()
