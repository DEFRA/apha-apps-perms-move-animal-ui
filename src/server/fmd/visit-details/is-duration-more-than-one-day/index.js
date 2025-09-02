import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { datePage } from '../date/index.js'
import { multipleDatesPage } from '../multiple-dates/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'isDurationMoreThanOneDay'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    validation: {
      empty: 'Select if the visit will take more than 1 day'
    },
    layout: 'inline'
  }
}

export class IsDurationMoreThanOneDayPage extends QuestionPage {
  urlPath = '/fmd/visit-details/duration-more-than-one-day'

  questionKey = questionKey
  sectionKey = 'visitDetails'
  question = 'Will the visit take more than 1 day? '

  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'yes') {
      return multipleDatesPage
    }
    return datePage
  }
}

export const isDurationMoreThanOneDayPage = new IsDurationMoreThanOneDayPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const isDurationMoreThanOneDay = new FmdQuestionPageController(
  isDurationMoreThanOneDayPage
).plugin()
