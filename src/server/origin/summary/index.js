import { Page } from '../../common/model/page/page-model.js'
import {
  originSummaryGetController,
  originSummaryPostController
} from './controller.js'

/**
 * Sets up the routes used in the summary page.
 * These routes are registered in src/server/router.js.
 */

export class SummaryPage extends Page {
  urlPath = '/origin/summary'
  isFinal = true
}
export const summaryPage = new SummaryPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originSummary = {
  plugin: {
    name: 'origin-summary',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: summaryPage.urlPath,
          ...originSummaryGetController
        },
        {
          method: 'POST',
          path: summaryPage.urlPath,
          ...originSummaryPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
