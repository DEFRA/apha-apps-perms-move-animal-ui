import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { GrazingFieldHowSeparatedAnswer } from '../../common/model/answer/grazing-field-how-separated/grazing-field-how-separated.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { roadsAndTracksPage } from '../roads-and-tracks/index.js'

export class GrazingFieldHowSeparatedPage extends QuestionPage {
  urlPath = '/biosecurity/grazing-field-how-separated'
  sectionKey = 'biosecurity'
  question = 'How is this grazing field separated from the resident herd?'
  questionKey = 'grazingFieldHowSeparated'
  Answer = GrazingFieldHowSeparatedAnswer

  nextPage() {
    return roadsAndTracksPage
  }
}

export const grazingFieldHowSeparatedPage = new GrazingFieldHowSeparatedPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const grazingFieldHowSeparated = new QuestionPageController(
  grazingFieldHowSeparatedPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
