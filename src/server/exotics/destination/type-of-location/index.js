import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { addressPage } from '../address/index.js'

/* eslint-disable @typescript-eslint/no-unused-vars */

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfLocation'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      farm: { label: 'Farm' },
      'corporate-holding': {
        label: 'Corporate holding',
        hint: 'Such as a food business or animal feed company'
      },
      'domestic-residence': { label: 'Domestic residence' },
      other: { label: 'Another location' }
    },
    validation: {
      empty: 'Select where the animals or products are going'
    }
  }
}

export class TypeOfLocationPage extends QuestionPage {
  urlPath = '/exotics/movement-destination/location-type'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Where are the animals or products going?'

  Answer = Answer

  /** @param {Answer} _answer */
  nextPage(_answer) {
    return addressPage
  }
}

export const typeOfLocationPage = new TypeOfLocationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfLocation = new ExoticsQuestionPageController(
  typeOfLocationPage
).plugin()
