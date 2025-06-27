import SummaryPage from '../../../common/model/page/summary-page/SummaryPageModel.js'
import { TbSummaryPageController } from '../../summary-page-controller.js'

import { BiosecurityPlanSection } from '~/src/server/common/model/section/biosecurity-plan/biosecurity-plan.js'

export class BiosecurityPlanSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  pageHeading = 'Check your answers before you continue your application'
  sectionKey = 'biosecurity-map'
  urlKey = 'biosecurity-map'
  urlPath = `/biosecurity-map/check-answers`
  sectionFactory = (data) => BiosecurityPlanSection.fromState(data)
}

export const biosecurityPlanSummaryPage = new BiosecurityPlanSummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const biosecurityPlanSummary = new TbSummaryPageController(
  new BiosecurityPlanSummaryPage()
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
