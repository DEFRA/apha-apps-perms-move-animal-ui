import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { cphPremisesPage } from '../cph-premises/index.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'destinationHasACphNumber'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    layout: 'inline',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    validation: {
      empty: 'Select if you know the CPH number for the destination premises'
    }
  }
}

export class DestinationHasACphNumberPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/cph-number-yes-no'

  questionKey = questionKey
  sectionKey = 'destination'
  question =
    'Does the destination premises have a county parish holding (CPH) number?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return cphPremisesPage
    }
    return checkAnswersPage
  }
}

export const destinationHasACphNumberPage = new DestinationHasACphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const destinationHasACphNumber = new FmdQuestionPageController(
  destinationHasACphNumberPage
).plugin()
