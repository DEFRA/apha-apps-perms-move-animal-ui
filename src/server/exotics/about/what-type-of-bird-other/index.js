import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '~/src/server/exotics/question-page-controller.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { numberOfAnimalsPage } from '../number-of-animals/index.js'

/** @import { TextConfig } from '~/src/server/common/model/answer/text/text.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'whatTypeOfBirdOther'

export class Answer extends TextAnswer {
  /** @type { TextConfig } */
  static config = {
    payloadKey: questionKey,
    characterWidth: 20,
    validation: {
      empty: {
        message: 'Enter what type of birds you are moving'
      },
      maxLength: {
        value: 1000,
        message: 'Your answer must be no longer than 100 characters'
      }
    }
  }
}

export class WhatTypeOfBirdOtherPage extends QuestionPage {
  urlPath =
    '/exotics/about-the-movement/what-is-moving/select-animals/birds/enter-bird-type'

  questionKey = questionKey
  sectionKey = 'about'
  question = 'What type of bird are you moving?'

  Answer = Answer

  nextPage() {
    return numberOfAnimalsPage
  }
}

export const whatTypeOfBirdOtherPage = new WhatTypeOfBirdOtherPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const whatTypeOfBirdOther = new ExoticsQuestionPageController(
  whatTypeOfBirdOtherPage
).plugin()
