import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '../../question-page-controller.js'
import { enterWhatIsMovingDescriptionPage } from '../enter-what-is-moving-description/index.js'

const questionKey = 'howMuchAreYouMoving'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class Answer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: questionKey,
    rows: 10,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: { message: 'Enter how much you are moving' }
    }
  }
}

export class EnterWhatIsMovingQuantityPage extends QuestionPage {
  urlPath =
    '/exotics/about-the-movement/what-is-moving/enter-what-is-moving/quantity'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'How much are you moving?'

  Answer = Answer

  nextPage() {
    return enterWhatIsMovingDescriptionPage
  }
}

export const enterWhatIsMovingQuantityPage = new EnterWhatIsMovingQuantityPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const enterWhatIsMovingQuantity = new ExoticsQuestionPageController(
  enterWhatIsMovingQuantityPage
).plugin()
