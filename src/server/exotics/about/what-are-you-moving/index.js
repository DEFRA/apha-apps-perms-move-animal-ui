import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { NotImplementedError } from '~/src/server/common/helpers/not-implemented-error.js'
import { Page } from '~/src/server/common/model/page/page-model.js'
import { ExoticStateManager } from '../../state-manager.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

/** @import {RadioButtonConfig} from '~/src/server/common/model/answer/radio-button/radio-button.js' */

export class WhatAreYouMovingAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'whatAreYouMoving',
    options: {
      animals: { label: 'Animals' },
      carcasses: { label: 'Carcasses' },
      'animal-by-products': { label: 'Animal by-products' },
      'equipment': { label: 'Machinery and equipment' },
      'bedding-and-feed': { label: 'Livestock bedding and feed' },
      'other': { label: 'Something else' }
    },
    errors: {
      emptyOptionText:
        'Select what you are moving'
    }
  }
}

export class ExoticWhatAreYouMoving extends QuestionPage {
  urlPath = '/exotic/about/what-are-you-moving'
  sectionKey = 'about'
  question = 'What are you moving?'
  questionKey = 'whatAreYouMoving'

  Answer = WhatAreYouMovingAnswer

  /** @returns {Page} */
  nextPage() {
    throw new NotImplementedError()
  }
}

export const exoticWhatAreYouMovingPage = new ExoticWhatAreYouMoving()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticWhatAreYouMoving = new QuestionPageController(exoticWhatAreYouMovingPage, ExoticStateManager).plugin()
