import { TbQuestionPageController } from '../../question-page-controller.js'
import { GrazingFieldHowSeparatedAnswer } from '../../../common/model/answer/grazing-field-how-separated/grazing-field-how-separated.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { lastGrazedPage } from '../last-grazed/index.js'

export class GrazingFieldHowSeparatedPage extends QuestionPage {
  urlPath = '/biosecurity/grazing-field-how-separated'
  sectionKey = 'biosecurity'
  question = 'How will you separate the incoming cattle from the resident herd?'
  questionKey = 'grazingFieldHowSeparated'
  Answer = GrazingFieldHowSeparatedAnswer
  view = 'tb/biosecurity/grazing-field-how-separated/index.njk'

  nextPage() {
    return lastGrazedPage
  }
}

export const grazingFieldHowSeparatedPage = new GrazingFieldHowSeparatedPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const grazingFieldHowSeparated = new TbQuestionPageController(
  grazingFieldHowSeparatedPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
