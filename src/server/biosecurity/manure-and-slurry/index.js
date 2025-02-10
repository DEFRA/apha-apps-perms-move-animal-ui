import { QuestionPageController } from '../../common/controller/question-page-controller/question-page-controller.js'
import { ManureAndSlurryAnswer } from '../../common/model/answer/manure-and-slurry/manure-and-slurry.js'
import { QuestionPage } from '../../common/model/page/question-page-model.js'
import { grazingFieldHowSeparatedPage } from '../grazing-field-how-separated/index.js'

export class ManureAndSlurryPage extends QuestionPage {
  urlPath = '/biosecurity/manure-and-slurry'
  sectionKey = 'biosecurity'
  question =
    'Has any manure or slurry been put on the grazing field in the past 60 days?'

  questionKey = 'manureAndSlurry'
  Answer = ManureAndSlurryAnswer

  nextPage() {
    return grazingFieldHowSeparatedPage
  }
}

export const manureAndSlurryPage = new ManureAndSlurryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const manureAndSlurry = new QuestionPageController(
  manureAndSlurryPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
