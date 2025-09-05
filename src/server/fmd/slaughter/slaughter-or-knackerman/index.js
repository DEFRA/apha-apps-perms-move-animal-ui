import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { slaughtermanNamePage } from '../slaughterman-name/index.js'
import { businessNameKnackermanPage } from '../business-name-knackerman/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'slaughterOrKnackerman'

export class Answer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: questionKey,
    options: {
      knackerman: {
        label: 'Knackerman'
      },
      slaughterman: {
        label: 'Slaughterman'
      }
    },
    validation: {
      empty: 'Select who the slaughter will be done by'
    }
  }
}

export class SlaughterOrKnackermanPage extends QuestionPage {
  urlPath = '/fmd/slaughter-information/slaughterman-or-knackerman'

  questionKey = questionKey
  sectionKey = 'slaughter'
  question = 'Will the slaughter be done by a Slaughterman or Knackerman?'

  Answer = Answer

  nextPage(answer) {
    if (answer.value === 'knackerman') {
      return businessNameKnackermanPage
    }

    return slaughtermanNamePage
  }
}

export const slaughterOrKnackermanPage = new SlaughterOrKnackermanPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const slaughterOrKnackerman = new FmdQuestionPageController(
  slaughterOrKnackermanPage
).plugin()
