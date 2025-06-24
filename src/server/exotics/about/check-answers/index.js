import SummaryPage from '../../../common/model/page/summary-page/SummaryPageModel.js'
import { SummaryPageController } from '../../../common/controller/summary-page-controller/summary-page-controller.js'

import { ExoticAboutSection } from '../section-model.js'
import { ExoticStateManager } from '../../state-manager.js'

export class ExoticAboutSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'about'
  urlPath = `/exotic/about`
  urlKey = 'exotic/about'
  sectionFactory = (data) => ExoticAboutSection.fromState(data)
}

export const exoticAboutSummaryPage = new ExoticAboutSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticAboutSummary = new SummaryPageController(
  exoticAboutSummaryPage,
  ExoticStateManager
).plugin()


/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
