import SummaryPage from '~/src/server/common/model/page/summary-page/SummaryPageModel.js'
import { OriginSection } from '../section.js'
import { FmdSummaryPageController } from '../../summary-page-controller.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class CheckAnswersPage extends SummaryPage {
  urlPath = '/fmd/movement-origin/check-answers'
  urlKey = 'fmd/movement-origin'
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'origin'
  sectionFactory = (data) => OriginSection.fromState(data)
}

export const checkAnswersPage = new CheckAnswersPage()

/** * @satisfies {ServerRegisterPluginObject<void>} */
export const checkAnswers = new FmdSummaryPageController(
  checkAnswersPage
).plugin()
