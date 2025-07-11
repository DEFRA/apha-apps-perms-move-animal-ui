import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { hasACphNumberPage } from '../has-a-cph-number/index.js'
import { addressPage } from '../address/index.js'
import { cphNumberPage } from '../cph-number/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'typeOfLocation'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      farm: {
        label: 'Farm'
      },
      'corporate-holding': {
        label: 'Corporate holding'
      },
      'domestic-residence': {
        label: 'Domestic residence'
      },
      other: {
        label: 'Another location (such as a zoo or show)'
      }
    },
    validation: {
      empty: 'Select where the visit will take place'
    }
  }
}

export class LocationOfVisitPage extends QuestionPage {
  urlPath = '/exotics/location-of-visit/visit'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question = 'Where will the visit take place?'

  Answer = Answer

  nextPage(answer, state) {
    if (answer?.value !== 'domestic-residence') {
      return cphNumberPage
    }

    if (
      state.about?.whatIsMoving === 'live-animals' &&
      ['pigs', 'sheep-and-goats', 'cattle'].includes(state?.about?.typeOfAnimal)
    ) {
      return hasACphNumberPage
    }

    return addressPage
  }
}

export const locationOfVisitPage = new LocationOfVisitPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const locationOfVisit = new ExoticsQuestionPageController(
  locationOfVisitPage
).plugin()
