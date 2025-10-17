import { TbQuestionPageController } from '../../question-page-controller.js'
import { GrazingAnswer } from '../../../common/model/answer/grazing/grazing.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { lastGrazedPage } from '../last-grazed/index.js'
import { manureAndSlurryDetailsPage } from '../manure-and-slurry-details/index.js'

export class GrazingPage extends QuestionPage {
  urlPath = '/biosecurity/grazing'
  sectionKey = 'biosecurity'
  question = 'Will the incoming animals be grazed?'
  questionKey = 'grazing'
  Answer = GrazingAnswer

  /** @param {GrazingAnswer} answer */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextPage(answer) {
    if (answer.value === 'yes') {
      return lastGrazedPage
    }
    return manureAndSlurryDetailsPage
  }
}

export const grazingPage = new GrazingPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const grazing = new TbQuestionPageController(grazingPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
