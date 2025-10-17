import { TbQuestionPageController } from '../../question-page-controller.js'
import { GrazingFieldHowSeparatedAnswer } from '../../../common/model/answer/grazing-field-how-separated/grazing-field-how-separated.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { manureAndSlurryDetailsPage } from '../manure-and-slurry-details/index.js'

export class GrazingFieldHowSeparatedPage extends QuestionPage {
  urlPath = '/biosecurity/grazing-field-how-separated'
  sectionKey = 'biosecurity'
  question =
    'Which measures are being taken to reduce the spread of TB when the animals are grazing?'

  questionKey = 'grazingFieldHowSeparated'
  Answer = GrazingFieldHowSeparatedAnswer
  view = 'tb/biosecurity/grazing-field-how-separated/index.njk'

  /** @param {GrazingFieldHowSeparatedAnswer} answer */
  nextPage(answer) {
    if (answer.value?.includes('other')) {
      //
    }
    return manureAndSlurryDetailsPage
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
