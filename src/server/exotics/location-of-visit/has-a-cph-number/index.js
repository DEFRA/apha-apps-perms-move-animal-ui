import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { cphNumberPage } from '../cph-number/index.js'
import { cphExitPage } from '../cph-exit/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'hasACphNumber'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    layout: 'inline',
    options: {
      yes: {
        label: 'Yes'
      },
      no: {
        label: 'No'
      }
    },
    validation: {
      empty:
        'Select if the premises where the visit is happening has a CPH number'
    }
  }
}

export class HasACphNumberPage extends QuestionPage {
  urlPath = '/exotics/location-of-visit/cph-yes-no'

  questionKey = questionKey
  sectionKey = 'locationOfVisit'
  question =
    'Does the premises where the visit is happening have a county parish holding (CPH) number?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value === 'no') {
      return cphExitPage
    }

    return cphNumberPage
  }
}

export const hasACphNumberPage = new HasACphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const hasACphNumber = new ExoticsQuestionPageController(
  hasACphNumberPage
).plugin()
