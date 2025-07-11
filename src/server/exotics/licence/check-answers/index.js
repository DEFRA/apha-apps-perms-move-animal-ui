import SummaryPage from '~/src/server/common/model/page/summary-page/SummaryPageModel.js'
import { LicenceSection } from '../section.js'
import { ExoticsSummaryPageController } from '../../summary-page-controller.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class CheckAnswersPage extends SummaryPage {
  urlPath = '/exotics/receiving-the-licence/check-answers'
  urlKey = 'exotics/receiving-the-licence'
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'licence'
  sectionFactory = (data) => LicenceSection.fromState(data)
}

export const checkAnswersPage = new CheckAnswersPage()

/** * @satisfies {ServerRegisterPluginObject<void>} */
export const checkAnswers = new ExoticsSummaryPageController(
  checkAnswersPage
).plugin()
