import SummaryPage from '../../../common/model/page/summary-page/SummaryPageModel.js'
import { TbSummaryPageController } from '../../summary-page-controller.js'

import { LicenceSection } from '~/src/server/tb/licence/section.js'

export class LicenceSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'licence'
  urlPath = `/receiving-the-licence/check-answers`
  urlKey = 'receiving-the-licence'
  sectionFactory = (data) => LicenceSection.fromState(data)
}

export const licenceSummaryPage = new LicenceSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licenceSummary = new TbSummaryPageController(
  new LicenceSummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
