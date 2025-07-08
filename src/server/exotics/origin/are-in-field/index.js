import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { fieldParcelNumberPage } from '../field-parcel-number/index.js'
import { latitudeAndLongitudePage } from '../latitude-and-longitude/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'areInField'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    validation: {
      empty: 'Select if the animals you plan to move are in a field'
    },
    layout: 'inline'
  }
}

export class AreInFieldPage extends QuestionPage {
  urlPath = '/exotics/movement-origin/animals-in-field'

  questionKey = questionKey
  sectionKey = 'origin'
  question = 'Are the animals you plan to move in a field?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return fieldParcelNumberPage
    }

    return latitudeAndLongitudePage
  }
}

export const areInFieldPage = new AreInFieldPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const areInField = new ExoticsQuestionPageController(
  areInFieldPage
).plugin()
