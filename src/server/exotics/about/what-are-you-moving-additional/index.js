import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { ExoticStateManager } from '../../state-manager.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { exoticHowMuchAreYouMovingPage } from '../how-much-are-you-moving/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

/** @import { Page } from '~/src/server/common/model/page/page-model.js' */
/** @import {TextAreaConfig} from '~/src/server/common/model/answer/text-area/text-area.js' */

export class WhatAreYouMovingAdditionalAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'whatAreYouMovingAdditional',
    validation: {
      empty: {
        message: 'Enter information about what you are moving'
      },
      maxLength: {
        message: 'Answer must be no longer than 5000 characters long',
        value: 5_000
      }
    }
  }
}

export class ExoticWhatAreYouMovingAdditional extends QuestionPage {
  urlPath = '/exotic/about/what-are-you-moving-additional'
  sectionKey = 'about'
  question = 'What are you moving?'
  questionKey = 'whatAreYouMovingAdditional'

  Answer = WhatAreYouMovingAdditionalAnswer

  /** @returns {Page} */
  nextPage() {
    return exoticHowMuchAreYouMovingPage
  }
}

export const exoticWhatAreYouMovingAdditionalPage =
  new ExoticWhatAreYouMovingAdditional()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticWhatAreYouMovingAdditional = new QuestionPageController(
  exoticWhatAreYouMovingAdditionalPage,
  ExoticStateManager
).plugin()
