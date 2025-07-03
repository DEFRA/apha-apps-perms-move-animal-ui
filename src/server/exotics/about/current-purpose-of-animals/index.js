import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { whatIsMovingIdNumberPage } from '../what-is-moving-id-number/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'currentPurposeOfAnimals'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'For example, kept as pets or are on the premises for restocking reasons',
    characterWidth: 20,
    validation: {
      empty: {
        message: 'Enter the current use or purpose of the animals'
      },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class CurrentPurposeOfAnimalsPage extends QuestionPage {
  urlPath = '/exotics/about-the-movement/what-is-moving/purpose'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What is the current use or purpose of the animals?'

  Answer = Answer

  nextPage() {
    return whatIsMovingIdNumberPage
  }
}

export const currentPurposeOfAnimalsPage = new CurrentPurposeOfAnimalsPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const currentPurposeOfAnimals = new ExoticsQuestionPageController(
  currentPurposeOfAnimalsPage
).plugin()
