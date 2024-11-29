import {
  originSummaryGetController,
  originSummaryPostController
} from './controller.js'

/**
 * Sets up the routes used in the summary page.
 * These routes are registered in src/server/router.js.
 */

const path = 'summary'

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
          path: `/${path}`,
          ...originSummaryGetController
        },
        {
          method: 'POST',
          path: `/${path}`,
          ...originSummaryPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
