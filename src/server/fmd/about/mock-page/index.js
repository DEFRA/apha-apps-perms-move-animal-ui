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

export class MockAboutPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement/mock-page'
  sectionKey = 'about'
  question = 'This is a mock page'

  questionKey = questionKey
  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const mockAboutPage = new MockAboutPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const mockAbout = new FmdQuestionPageController(mockAboutPage).plugin()
