import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { destinationBusinessAddressPage } from '../destination-business-address/index.js'
import { destinationHasACphNumberPage } from '../destination-has-a-cph-number/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'destinationAddressKnown'

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
      empty: 'Select if you know the address for the destination business'
    }
  }
}

export class DestinationAddressKnownPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/business-address-yes-no'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Do you know the address of the destination premises?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return destinationBusinessAddressPage
    }
    return destinationHasACphNumberPage
  }
}

export const destinationAddressKnownPage = new DestinationAddressKnownPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const destinationAddressKnown = new FmdQuestionPageController(
  destinationAddressKnownPage
).plugin()
