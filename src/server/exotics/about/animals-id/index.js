import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'animalsId'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'For example, ear tags, slap marks or flock numbers',
    spellcheck: false,
    rows: 10,
    validation: {
      empty: {
        message: 'Enter the ID numbers for the animals you are moving'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      }
    }
  }
}

export class AnimalsIdPage extends QuestionPage {
  urlPath = '/exotics/about-the-movement/what-is-moving/id-numbers'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What are the ID numbers for the animals you are moving?'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const animalsIdPage = new AnimalsIdPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const animalsId = new ExoticsQuestionPageController(
  animalsIdPage
).plugin()
