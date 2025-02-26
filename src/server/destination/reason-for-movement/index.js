import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { ReasonForMovementAnswer } from '../../common/model/answer/movement-reason/movement-reason.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { additionalInfoPage } from '../additional-info/index.js'
import { quantityOptionsPage } from '../quantity-options/index.js'

export class ReasonForMovementPage extends QuestionPage {
  urlPath = '/destination/reason-for-movement'
  sectionKey = 'destination'
  question = 'What is the reason for the movement?'
  questionKey = 'reasonForMovement'

  Answer = ReasonForMovementAnswer

  /**
   * @param {ReasonForMovementAnswer} answer
   */
  nextPage(answer) {
    if (answer.value === 'routineRestocking') {
      return quantityOptionsPage
    } else {
      return additionalInfoPage
    }
  }
}

export const reasonForMovementPage = new ReasonForMovementPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const reasonForMovement = new QuestionPageController(
  new ReasonForMovementPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
