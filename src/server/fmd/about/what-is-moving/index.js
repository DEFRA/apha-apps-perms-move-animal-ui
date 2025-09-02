import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { FmdQuestionPageController } from '../../question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { enterWhatIsMovingPage } from '../enter-what-is-moving/index.js'
import { typeOfAnimalPage } from '../type-of-animal/index.js'
import { aboutMovementExitPage } from '../about-movement-exit-page/index.js'

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
    validation: {
      empty: 'Select what you are moving'
    }
  }
}

export class WhatIsMovingPage extends QuestionPage {
  urlPath = '/fmd/about-the-movement/what-is-moving'
  sectionKey = 'about'
  question = 'What are you moving?'

  questionKey = questionKey
  Answer = Answer

  /** @param {Answer} answer */
  nextPage(answer) {
    if (answer.value === 'live-animals') {
      return typeOfAnimalPage
    }
    if (
      answer.value === 'carcasses' ||
      answer.value === 'animal-by-products-and-waste'
    ) {
      return enterWhatIsMovingPage
    }
    return aboutMovementExitPage
  }
}

export const whatIsMovingPage = new WhatIsMovingPage()

/** @satisfies {ServerRegisterPluginObject<void>} */
export const whatIsMoving = new FmdQuestionPageController(
  whatIsMovingPage
).plugin()
