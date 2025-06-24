import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { NotImplementedError } from '~/src/server/common/helpers/not-implemented-error.js'
import { Page } from '~/src/server/common/model/page/page-model.js'
import { ExoticStateManager } from '../../state-manager.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { exoticAboutSummaryPage } from '../check-answers/index.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

/** @import {TextAreaConfig} from '~/src/server/common/model/answer/text-area/text-area.js' */

export class DescribeWhatYouAreMovingAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'describeWhatYouAreMoving',
    validation: {
      empty: {
        message: 'Enter information on what you are moving'
      },
      maxLength: {
        message: 'Answer must be no longer than 5000 characters long',
        value: 5_000
      }
    }
  }
}

export class ExoticDescribeWhatYouAreMoving extends QuestionPage {
  urlPath = '/exotic/about/describe-what-you-are-moving'
  sectionKey = 'about'
  question = 'Describe what you are moving'
  questionKey = 'describeWhatYouAreMoving'

  Answer = DescribeWhatYouAreMovingAnswer

  /** @returns {Page} */
  nextPage() {
    return exoticAboutSummaryPage
  }
}

export const exoticDescribeWhatYouAreMovingPage =
  new ExoticDescribeWhatYouAreMoving()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticDescribeWhatYouAreMoving = new QuestionPageController(
  exoticDescribeWhatYouAreMovingPage,
  ExoticStateManager
).plugin()
