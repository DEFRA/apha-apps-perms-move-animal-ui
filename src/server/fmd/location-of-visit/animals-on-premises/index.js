import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalsOnPremises'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    spellcheck: false,
    rows: 4,
    validation: {
      empty: {
        message: 'Enter what animals are on the premises'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      }
    }
  }
}

export class AnimalsOnPremisesPage extends QuestionPage {
  urlPath = '/fmd/location-of-visit/animals-onsite'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question = 'What animals are on the premises?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const animalsOnPremisesPage = new AnimalsOnPremisesPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalsOnPremises = new FmdQuestionPageController(
  animalsOnPremisesPage
).plugin()
