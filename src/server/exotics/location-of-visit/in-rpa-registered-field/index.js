import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { fieldParcelNumberPage } from '../field-parcel-number/index.js'
import { latitudeAndLongitudePage } from '../latitude-and-longitude/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'inRpaRegisteredField'

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
      empty: 'Select if the visit will be at an RPA registered field'
    }
  }
}

export class InRpaRegisteredFieldPage extends QuestionPage {
  urlPath = '/exotics/location-of-visit/rpa-field'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question = 'Will the visit be at an RPA registered field?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return fieldParcelNumberPage
    }

    return latitudeAndLongitudePage
  }
}

export const inRpaRegisteredFieldPage = new InRpaRegisteredFieldPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const inRpaRegisteredField = new ExoticsQuestionPageController(
  inRpaRegisteredFieldPage
).plugin()
