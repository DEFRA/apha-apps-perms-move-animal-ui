import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { enterWhatIsMovingQuantityPage } from '../enter-what-is-moving-quantity/index.js'
import { FmdQuestionPageController } from '../../question-page-controller.js'

const questionKey = 'whatAreYouMovingDetails'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class Answer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: questionKey,
    stripWhitespace: true,
    characterWidth: 20,
    validation: {
      maxLength: {
        value: 100,
        message: 'Your answer must be no longer than 100 characters'
      },
      empty: { message: 'Enter information about what you are moving' }
    }
  }
}

export class EnterWhatIsMovingPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement/what-is-moving/enter-what-is-moving'
  questionKey = questionKey
  sectionKey = 'about'
  question = 'What are you moving?'

  Answer = Answer

  nextPage() {
    return enterWhatIsMovingQuantityPage
  }
}

export const enterWhatIsMovingPage = new EnterWhatIsMovingPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const enterWhatIsMoving = new FmdQuestionPageController(
  enterWhatIsMovingPage
).plugin()
