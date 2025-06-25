import SummaryPage from '../../../common/model/page/summary-page/SummaryPageModel.js'

import { ExoticAboutSection } from '../section-model.js'
import { ExoticStateManager } from '../../state-manager.js'
import { ExoticSummaryPageController } from '../../controllers.js'

export class ExoticAboutSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'about'
  urlPath = `/exotic/about/check-answers`
  urlKey = 'exotic/about'
  sectionFactory = (data) => ExoticAboutSection.fromState(data)
}

export const exoticAboutSummaryPage = new ExoticAboutSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticAboutSummary = new ExoticSummaryPageController(
  exoticAboutSummaryPage,
  ExoticStateManager
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
