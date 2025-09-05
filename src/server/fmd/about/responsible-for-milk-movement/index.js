import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { milkAnimalPage } from '../milk-animal/index.js'
import { licenceNotNeededExitPage } from '../licence-not-needed/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'responsibleForMilkMovement'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    layout: 'inline',
    validation: {
      empty:
        'Select if you are responsible for organising the movement of the milk'
    }
  }
}

export class ResponsibleForMilkMovementPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/responsibility-for-movement'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'Are you responsible for organising the movement of the milk?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return milkAnimalPage
    }

    return licenceNotNeededExitPage
  }
}

export const responsibleForMilkMovementPage =
  new ResponsibleForMilkMovementPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const responsibleForMilkMovement = new FmdQuestionPageController(
  responsibleForMilkMovementPage
).plugin()
