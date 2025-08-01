import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { addressPage } from '../address/index.js'
import { destinationExitPage } from '../destination-exit-page/index.js'

/* eslint-disable @typescript-eslint/no-unused-vars */

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

const questionKey = 'typeOfLocation'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      slaughter: { label: 'Slaughter' },
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

  /**
   * @param {Answer} answer
   * @param {RawApplicationState} context
   */
  nextPage(answer, context) {
    if (
      answer.value !== 'slaughter' &&
      context.about?.whatIsMoving === 'live-animals'
    ) {
      return destinationExitPage
    }

    return addressPage
  }
}

export const typeOfLocationPage = new TypeOfLocationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const typeOfLocation = new ExoticsQuestionPageController(
  typeOfLocationPage
).plugin()
