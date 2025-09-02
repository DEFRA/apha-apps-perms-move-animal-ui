import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '../../question-page-controller.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'mockQuestion'

export class Answer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: questionKey,
    options: {
      one: { label: 'mock value' }
    },
    validation: {
      empty: 'Select something'
    }
  }
}

export class MockDestinationPage extends QuestionPage {
  urlPath = '/fmd/movement-destination/mock-page'
  sectionKey = 'destination'
  question = 'This is a mock page'

  questionKey = questionKey
  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const mockDestinationPage = new MockDestinationPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const mockDestination = new FmdQuestionPageController(
  mockDestinationPage
).plugin()
