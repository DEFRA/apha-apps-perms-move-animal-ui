import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { isDurationMoreThanOneDayPage } from '../is-duration-more-than-one-day/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'reason'

export class Answer extends TextAreaAnswer {
  /** @type { TextAreaConfig } */
  static config = {
    payloadKey: questionKey,
    hint: 'For example, routine restocking or welfare',
    rows: 4,
    validation: {
      empty: {
        message: 'Enter the reason for the visit'
      },
      maxLength: {
        value: 5_000,
        message: 'Your answer must be no longer than 5000 characters'
      }
    }
  }
}

export class ReasonPage extends QuestionPage {
  urlPath = '/exotics/visit-details/reason'

  questionKey = questionKey
  sectionKey = 'visitDetails'
  question = 'What is the reason for the visit?'

  Answer = Answer

  nextPage() {
    return isDurationMoreThanOneDayPage
  }
}

export const reasonPage = new ReasonPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const reason = new ExoticsQuestionPageController(reasonPage).plugin()
