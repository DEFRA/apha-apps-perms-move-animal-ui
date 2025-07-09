import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalsOnPremises'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    rows: 4,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: { message: 'Enter what animals are on the premises' }
    }
  }
}

export class AnimalsOnPremisesPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/animals-onsite'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'What animals are on the premises?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const animalsOnPremisesPage = new AnimalsOnPremisesPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalsOnPremises = new ExoticsQuestionPageController(
  animalsOnPremisesPage
).plugin()
