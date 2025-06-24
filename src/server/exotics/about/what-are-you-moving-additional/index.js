import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { NotImplementedError } from '~/src/server/common/helpers/not-implemented-error.js'
import { Page } from '~/src/server/common/model/page/page-model.js'
import { ExoticStateManager } from '../../state-manager.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

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
    throw new NotImplementedError()
  }
}

export const exoticWhatAreYouMovingAdditionalPage = new ExoticWhatAreYouMovingAdditional()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticWhatAreYouMovingAdditional = new QuestionPageController(exoticWhatAreYouMovingAdditionalPage, ExoticStateManager).plugin()
