import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { whatIsMovingPage } from '../what-is-moving/index.js'
import { animalSlaughteredPage } from '../animal-slaughtered/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'movementActivityType'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      'on-to-farm': { label: 'Movement on to a farm or premises' },
      'off-of-farm': {
        label: 'Movement off a farm or premises',
        hint: 'Including moving or collecting milk'
      },
      'slaughter-onsite': {
        label: 'Slaughter of animals onsite',
        hint: 'Including bringing a Slaughterman or Knackerman onsite'
      }
    },
    validation: {
      empty:
        'Select the type of movement or activity your application relates to'
    }
  }
}

export class MovementActivityTypePage extends QuestionPage {
  urlPath = '/fmd/about-the-movement-or-activity/type'

  questionKey = questionKey
  sectionKey = 'about'
  question =
    'Which type of movement or activity does your application relate to?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'slaughter-onsite') {
      return animalSlaughteredPage
    }

    return whatIsMovingPage
  }
}

export const movementActivityTypePage = new MovementActivityTypePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const movementActivityType = new FmdQuestionPageController(
  movementActivityTypePage
).plugin()
