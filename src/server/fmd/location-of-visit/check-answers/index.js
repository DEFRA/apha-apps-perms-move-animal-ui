import SummaryPage from '~/src/server/common/model/page/summary-page/SummaryPageModel.js'
import { LocationOfVisitSection } from '../section.js'
import { FmdSummaryPageController } from '../../summary-page-controller.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class CheckAnswersPage extends SummaryPage {
  urlPath = '/fmd/location-of-visit/check-answers'
  urlKey = 'fmd/location-of-visit'
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'locationOfVisit'
  sectionFactory = (data) => LocationOfVisitSection.fromState(data)
}

export const checkAnswersPage = new CheckAnswersPage()

/** * @satisfies {ServerRegisterPluginObject<void>} */
export const checkAnswers = new FmdSummaryPageController(
  checkAnswersPage
).plugin()
