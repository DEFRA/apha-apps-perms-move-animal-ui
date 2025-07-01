import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { ExoticsQuestionPageController } from '../../question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { selectAnimalsPage } from '../select-animals/index.js'
import { enterWhatIsMovingPage } from '../enter-what-is-moving/index.js'

/** @import { RadioButtonConfig } from '~/src/server/common/model/answer/radio-button/radio-button.js' */
/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

const questionKey = 'whatIsMoving'

export class Answer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: questionKey,
    options: {
      'live-animals': { label: 'Live animals' },
      carcasses: { label: 'Carcasses' },
      'animal-by-products-and-waste': {
        label: 'Animal by-products and waste materials'
      },
      equipment: { label: 'Machinery and equipment' },
      'bedding-and-feed': { label: 'Livestock bedding and feed' },
      other: { label: 'Something else' }
    },
    errors: {
      emptyOptionText: 'Select what you are moving'
    }
  }
}

export class WhatIsMovingPage extends QuestionPage {
  urlPath = '/exotics/about-the-movement/what-is-moving'
  sectionKey = 'about'
  question = 'What are you moving?'

  questionKey = questionKey
  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'live-animals') {
      return selectAnimalsPage
    }

    return enterWhatIsMovingPage
  }
}

export const whatIsMovingPage = new WhatIsMovingPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const whatIsMoving = new ExoticsQuestionPageController(
  whatIsMovingPage
).plugin()
