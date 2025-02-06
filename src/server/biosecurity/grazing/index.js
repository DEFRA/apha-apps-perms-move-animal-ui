import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { GrazingAnswer } from '../../common/model/answer/grazing/grazing.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { lastGrazedPage } from '../last-grazed/index.js'
import { roadsAndTracksPage } from '../roads-and-tracks/index.js'

export class GrazingPage extends QuestionPage {
  urlPath = '/biosecurity/grazing'
  sectionKey = 'biosecurity'
  question = 'Will the incoming cattle be grazed?'
  questionKey = 'grazing'
  Answer = GrazingAnswer

  /** @param {GrazingAnswer} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'yes') {
      return lastGrazedPage
    }
    return roadsAndTracksPage
  }
}

export const grazingPage = new GrazingPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const grazing = new QuestionPageController(grazingPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
