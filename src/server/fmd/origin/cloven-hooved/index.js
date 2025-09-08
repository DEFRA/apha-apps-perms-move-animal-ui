import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'clovenHooved'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    spellcheck: false,
    rows: 4,
    validation: {
      empty: {
        message:
          'Enter what other cloven-hooved animals are kept on the premises'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      }
    }
  }
}

export class ClovenHoovedPage extends QuestionPage {
  urlPath = '/fmd/movement-origin/cloven-hooved-animals'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What other cloven-hooved animals are kept on the premises?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const clovenHoovedPage = new ClovenHoovedPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const clovenHooved = new FmdQuestionPageController(
  clovenHoovedPage
).plugin()
