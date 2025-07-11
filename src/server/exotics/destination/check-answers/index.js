import SummaryPage from '~/src/server/common/model/page/summary-page/SummaryPageModel.js'
import { DestinationSection } from '../section.js'
import { ExoticsSummaryPageController } from '../../summary-page-controller.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class CheckAnswersPage extends SummaryPage {
  urlPath = '/exotics/movement-destination/check-answers'
  urlKey = 'exotics/movement-destination'
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'destination'
  sectionFactory = (data) => DestinationSection.fromState(data)
}

export const checkAnswersPage = new CheckAnswersPage()

/** * @satisfies {ServerRegisterPluginObject<void>} */
export const checkAnswers = new ExoticsSummaryPageController(
  checkAnswersPage
).plugin()
