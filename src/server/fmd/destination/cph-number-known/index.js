import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { cphNumberPage } from '../cph-number/index.js'
import { cphNeededPage } from '../cph-needed/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'cphNumberKnown'

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
      empty: 'Select if you know the CPH number of the destination'
    }
  }
}

export class CphNumberKnownPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/cph-yes-no'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'Do you know the CPH number of the destination?'

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return cphNumberPage
    }

    return cphNeededPage
  }
}

export const cphNumberKnownPage = new CphNumberKnownPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const cphNumberKnown = new FmdQuestionPageController(
  cphNumberKnownPage
).plugin()
