import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '../../question-page-controller.js'
import { whatIsMovingPage } from '../what-is-moving/index.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'movementType'

export class Answer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: questionKey,
    options: {
      'onto-premises': { label: 'Onto a farm or premises' },
      'off-premises': { label: 'Off a farm or premises' },
      visit: { label: 'A visit to a farm or premises' }
    },
    errors: {
      emptyOptionText: 'Select the movement type'
    }
  }
}

export class MovementTypePage extends QuestionPage {
  urlPath = '/exotics/about-the-movement/movement-type'
  sectionKey = 'about'
  question = 'Which type of movement does your application relate to?'

  questionKey = questionKey
  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'visit') {
      return checkAnswersPage
    }

    return whatIsMovingPage
  }
}

export const movementTypePage = new MovementTypePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const movementType = new ExoticsQuestionPageController(
  movementTypePage
).plugin()
