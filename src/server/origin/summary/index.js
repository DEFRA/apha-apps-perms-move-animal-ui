import { originSummaryGetController } from './controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

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
          path: '/summary',
          ...originSummaryGetController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
