import SummaryPage from '../../../common/model/page/summary-page/SummaryPageModel.js'
import { TbSummaryPageController } from '../../summary-page-controller.js'

import { BiosecuritySection } from '~/src/server/tb/biosecurity/section.js'

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
export const biosecuritySummary = new TbSummaryPageController(
  new BiosecuritySummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
