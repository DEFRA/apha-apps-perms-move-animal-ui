import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { moveToSlaughterPage } from '../move-to-slaughter/index.js'
import { movementOnExitPagePage } from '../movement-on-exit-page/index.js'
import { typeOfAnimalsPage } from '../type-of-animals/index.js'
import { responsibleMilkPage } from '../responsible-milk/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { RawApplicationState } from '../../../common/model/state/state-manager.js' */

const questionKey = 'whatIsMoving'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      'live-animals': { label: 'Live animals' },
      carcasses: { label: 'Carcasses (dead animals)' },
      milk: { label: 'Milk' }
    },
    validation: {
      empty: 'Select what you are moving'
    }
  }
}

export class WhatIsMovingPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/what-is-moving'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What are you moving?'

  Answer = Answer

  /**
   * @param {Answer} answer
   * @param {RawApplicationState} context
   */
  nextPage(answer, context) {
    if (answer.value === 'live-animals') {
      return moveToSlaughterPage
    }
    if (context.about.movementActivityType === 'off-of-farm') {
      if (answer.value === 'carcasses') {
        return typeOfAnimalsPage
      }
      if (answer.value === 'milk') {
        return responsibleMilkPage
      }
    }
    return movementOnExitPagePage
  }
}

export const whatIsMovingPage = new WhatIsMovingPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const whatIsMoving = new FmdQuestionPageController(
  whatIsMovingPage
).plugin()
