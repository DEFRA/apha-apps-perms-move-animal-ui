import { TbQuestionPageController } from '../../question-page-controller.js'
import { LastGrazedAnswer } from '../../../common/model/answer/last-grazed/last-grazed.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { manureAndSlurryPage } from '../manure-and-slurry/index.js'

export class LastGrazedPage extends QuestionPage {
  urlPath = '/biosecurity/last-grazed'
  sectionKey = 'biosecurity'
  question = 'How long ago was the field last grazed by the resident herd?'
  questionKey = 'lastGrazed'
  Answer = LastGrazedAnswer

  nextPage() {
    return manureAndSlurryPage
  }
}

export const lastGrazedPage = new LastGrazedPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const lastGrazed = new TbQuestionPageController(lastGrazedPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
