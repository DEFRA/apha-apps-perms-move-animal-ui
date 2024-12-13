/**
 * Sets up the routes used in the on off farm page.
 * These routes are registered in src/server/router.js.
 */

import SummaryPage from '../../common/model/page/summary-page/SummaryPageModel.js'
import { SummaryPageController } from '../../common/controller/summary-page-controller/SummaryPageController.js'

import { Origin } from '~/src/server/common/model/section/origin.js'

/** @import { SectionModel } from '~/src/server/common/model/section/section-model/index.js' */

export class OriginSummaryPage extends SummaryPage {
  pageTitle = 'Check your answers before you continue your application'
  heading = 'Check your answers before you continue your application'
  sectionKey = 'origin'
  urlPath = `/${this.sectionKey}/summary`
  sectionFactory = (data) => Origin.fromState(data)
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
