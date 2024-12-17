import SummaryPage from '../../common/model/page/summary-page/SummaryPageModel.js'
import { SummaryPageController } from '../../common/controller/summary-page-controller/SummaryPageController.js'

import { OriginSection } from '~/src/server/common/model/section/origin/origin.js'

export class OriginSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  heading = 'Check your answers before you continue your application'
  sectionKey = 'origin'
  urlPath = `/${this.sectionKey}/check-answers`
  sectionFactory = (data) => OriginSection.fromState(data)
}

export const originSummaryPage = new OriginSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originSummary = new SummaryPageController(
  new OriginSummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
