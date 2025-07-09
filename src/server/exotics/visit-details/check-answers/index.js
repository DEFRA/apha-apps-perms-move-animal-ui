import SummaryPage from '~/src/server/common/model/page/summary-page/SummaryPageModel.js'
import { VisitDetailsSection } from '../section.js'
import { ExoticsSummaryPageController } from '../../summary-page-controller.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class CheckAnswersPage extends SummaryPage {
  urlPath = '/exotics/visit-details/check-answers'
  urlKey = 'exotics/visit-details'
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'visitDetails'
  sectionFactory = (data) => VisitDetailsSection.fromState(data)
}

export const checkAnswersPage = new CheckAnswersPage()

/** * @satisfies {ServerRegisterPluginObject<void>} */
export const checkAnswers = new ExoticsSummaryPageController(
  checkAnswersPage
).plugin()
