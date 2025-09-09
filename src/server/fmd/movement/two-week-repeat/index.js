import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { expectMovementDatePage } from '../expect-movement-date/index.js'
import { milkMovementDatePage } from '../milk-movement-date/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'twoWeekRepeat'

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
      empty: 'Select if the movement will be repeated within a 2 week period'
    }
  }
}

export class TwoWeekRepeatPage extends QuestionPage {
  urlPath = '/fmd/movement-details/repeat-movement'

  questionKey = questionKey
  sectionKey = 'movement'
  question = 'Will the movement be repeated within a 2 week period?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value === 'yes') {
      return milkMovementDatePage
    }
    return expectMovementDatePage
  }
}

export const twoWeekRepeatPage = new TwoWeekRepeatPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const twoWeekRepeat = new FmdQuestionPageController(
  twoWeekRepeatPage
).plugin()
