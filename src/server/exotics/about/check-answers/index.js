import SummaryPage from '~/src/server/common/model/page/summary-page/SummaryPageModel.js'
import { AboutSection } from '../section.js'
import { ExoticsSummaryPageController } from '../../summary-page-controller.js'

/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

export class CheckAnswersPage extends SummaryPage {
  urlPath = '/exotics/about-the-movement/check-answers'
  urlKey = 'exotics/about-the-movement'
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'about'
  sectionFactory = (data) => AboutSection.fromState(data)
}

export const checkAnswersPage = new CheckAnswersPage()

/** * @satisfies {ServerRegisterPluginObject<void>} */
export const checkAnswers = new ExoticsSummaryPageController(
  checkAnswersPage
).plugin()
