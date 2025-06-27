import { TbQuestionPageController } from '../../question-page-controller.js'
import { ReasonForMovementAnswer } from '../../../common/model/answer/reason-for-movement/reason-for-movement.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { additionalInfoPage } from '../additional-info/index.js'
import { restockAnimalPage } from '../restock-animals/index.js'

export class ReasonForMovementPage extends QuestionPage {
  urlPath = '/destination/reason-for-movement'
  sectionKey = 'destination'
  question = 'What is the reason for the movement?'
  questionKey = 'reasonForMovement'

  Answer = ReasonForMovementAnswer

  nextPage(answer) {
    if (answer.value === 'routineRestocking') {
      return restockAnimalPage
    }

    return additionalInfoPage
  }
}

export const reasonForMovementPage = new ReasonForMovementPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const reasonForMovement = new TbQuestionPageController(
  new ReasonForMovementPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
