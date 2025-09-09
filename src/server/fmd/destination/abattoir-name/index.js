import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '~/src/server/fmd/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { abattoirAddressPage } from '../abattoir-address/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'abattoirName'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    spellcheck: false,
    characterWidth: 20,
    validation: {
      empty: { message: 'Enter the name of the approved abattoir' },
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class AbattoirNamePage extends QuestionPage {
  urlPath = '/fmd/movement-destination/abattoir-name'

  questionKey = questionKey
  sectionKey = 'destination'
  question = 'What is the name of the approved abattoir?'

  Answer = Answer

  nextPage() {
    return abattoirAddressPage
  }
}

export const abattoirNamePage = new AbattoirNamePage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const abattoirName = new FmdQuestionPageController(
  abattoirNamePage
).plugin()
