import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '../../question-page-controller.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { checkAnswersPage } from '../check-answers/index.js'

/** @import { TextAreaConfig } from '~/src/server/common/model/answer/text-area/text-area.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'whatAreYouMovingDescription'

export class Answer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: questionKey,
    rows: 10,
    spellcheck: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: { message: 'Enter information on what you are moving' }
    }
  }
}

export class EnterWhatIsMovingDescriptionPage extends QuestionPage {
  urlPath =
    '/exotics/about-the-movement/what-is-moving/enter-what-is-moving/description'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'Describe what you are moving'

  Answer = Answer

  nextPage() {
    return checkAnswersPage
  }
}

export const enterWhatIsMovingDescriptionPage =
  new EnterWhatIsMovingDescriptionPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const enterWhatIsMovingDescription = new ExoticsQuestionPageController(
  enterWhatIsMovingDescriptionPage
).plugin()
