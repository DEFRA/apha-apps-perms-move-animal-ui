import SummaryPage from '../../common/model/page/summary-page/SummaryPageModel.js'
import { SummaryPageController } from '../../common/controller/summary-page-controller/summary-page-controller.js'

import { BiosecuritySection } from '~/src/server/common/model/section/biosecurity/biosecurity.js'

export class BiosecuritySummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'biosecurity'
  urlPath = `/${this.sectionKey}/check-answers`
  sectionFactory = (data) => BiosecuritySection.fromState(data)
}

export const biosecuritySummaryPage = new BiosecuritySummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const biosecuritySummary = new SummaryPageController(
  new BiosecuritySummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
