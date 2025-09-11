import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { premisesTypePage } from '../premises-type/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'tlaOrCphNumber'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 10,
    spellcheck: false,
    validation: {
      empty: { message: 'Enter the TLA or tCPH number' },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class TlaOrCphNumberPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/TLA-or-tCPH-number'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the TLA or temporary county parish holding (tCPH) number?'

  Answer = Answer

  nextPage() {
    return premisesTypePage
  }
}

export const tlaOrCphNumberPage = new TlaOrCphNumberPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const tlaOrCphNumber = new FmdQuestionPageController(
  tlaOrCphNumberPage
).plugin()
