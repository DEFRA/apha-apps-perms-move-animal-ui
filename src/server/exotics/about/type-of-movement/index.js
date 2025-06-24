import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { NotImplementedError } from '~/src/server/common/helpers/not-implemented-error.js'
import { Page } from '~/src/server/common/model/page/page-model.js'
import { exoticWhatAreYouMovingPage } from '../what-are-you-moving/index.js'
import { ExoticStateManager } from '../../state-manager.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

/** @import {RadioButtonConfig} from '~/src/server/common/model/answer/radio-button/radio-button.js' */

export class TypeOfMovementAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'typeOfMovement',
    options: {
      on: { label: 'Onto a farm or premises' },
      off: { label: 'Off a farm of premises' },
      visit: { label: 'Visit to a farm of premises' }
    },
    errors: {
      emptyOptionText:
        'Select the movement type'
    }
  }
}

export class ExoticTypeOfMovement extends QuestionPage {
  urlPath = '/exotic/about/type-of-movement'
  sectionKey = 'about'
  question = 'Which type of movement does your application relate to?'
  questionKey = 'typeOfMovement'

  Answer = TypeOfMovementAnswer

  /**
   * @param {TypeOfMovementAnswer} answer
   * @returns {Page}
   */
  nextPage(answer) {
    if (answer.value !== 'visit') {
      return exoticWhatAreYouMovingPage
    }

    throw new NotImplementedError()
  }
}

export const exoticTypeOfMovementPage = new ExoticTypeOfMovement()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticTypeOfMovement = new QuestionPageController(exoticTypeOfMovementPage, ExoticStateManager).plugin()

