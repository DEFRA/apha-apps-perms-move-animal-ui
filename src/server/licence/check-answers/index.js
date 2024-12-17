import SummaryPage from '../../common/model/page/summary-page/SummaryPageModel.js'
import { SummaryPageController } from '../../common/controller/summary-page-controller/SummaryPageController.js'

import { LicenceSection } from '~/src/server/common/model/section/licence/licence.js'

export class LicenceSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  heading = 'Check your answers before you continue your application'
  sectionKey = 'licence'
  urlPath = `/receiving-the-licence/check-answers`
  urlKey = 'receiving-the-licence'
  sectionFactory = (data) => LicenceSection.fromState(data)
}

export const licenceSummaryPage = new LicenceSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licenceSummary = new SummaryPageController(
  new LicenceSummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
