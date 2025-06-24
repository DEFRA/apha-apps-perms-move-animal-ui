import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { NotImplementedError } from '~/src/server/common/helpers/not-implemented-error.js'
import { Page } from '~/src/server/common/model/page/page-model.js'
import { ExoticStateManager } from '../../state-manager.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { exoticDescribeWhatYouAreMovingPage } from '../describe-what-you-are-moving/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

/** @import {TextAreaConfig} from '~/src/server/common/model/answer/text-area/text-area.js' */

export class HowMuchAreYouMovingAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'howMuchAreYouMoving',
    validation: {
      empty: {
        message: 'Enter how much you are moving'
      },
      maxLength: {
        message: 'Answer must be no longer than 5000 characters long',
        value: 5_000
      }
    }
  }
}

export class ExoticHowMuchAreYouMoving extends QuestionPage {
  urlPath = '/exotic/about/how-much-are-you-moving'
  sectionKey = 'about'
  question = 'How much are you moving?'
  questionKey = 'howMuchAreYouMoving'

  Answer = HowMuchAreYouMovingAnswer

  /** @returns {Page} */
  nextPage() {
    return exoticDescribeWhatYouAreMovingPage
  }
}

export const exoticHowMuchAreYouMovingPage = new ExoticHowMuchAreYouMoving()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticHowMuchAreYouMoving = new QuestionPageController(
  exoticHowMuchAreYouMovingPage,
  ExoticStateManager
).plugin()
