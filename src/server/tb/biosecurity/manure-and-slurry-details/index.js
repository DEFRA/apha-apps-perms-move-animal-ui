import { QuestionPageController } from '../../../common/controller/question-page-controller/question-page-controller.js'
import { ManureAndSlurryDetailsAnswer } from '../../../common/model/answer/manure-and-slurry-details/manure-and-slurry-details.js'
import { QuestionPage } from '../../../common/model/page/question-page-model.js'
import { disinfectantPage } from '../disinfectant/index.js'

export class ManureAndSlurryDetailsPage extends QuestionPage {
  urlPath = '/biosecurity/manure-and-slurry-details'
  sectionKey = 'biosecurity'
  question = 'How will you manage manure and slurry?'

  questionKey = 'manureAndSlurryDetails'
  Answer = ManureAndSlurryDetailsAnswer

  nextPage() {
    return disinfectantPage
  }
}

export const manureAndSlurryDetailsPage = new ManureAndSlurryDetailsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const manureAndSlurryDetails = new QuestionPageController(
  manureAndSlurryDetailsPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
