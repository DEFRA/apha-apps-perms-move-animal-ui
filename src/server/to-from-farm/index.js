import {
  toFromFarmGetController,
  toFromFarmPostController
} from './controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const toFromFarm = {
  plugin: {
    name: 'to-or-from-own-premises',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/to-or-from-own-premises',
          ...toFromFarmGetController
        },
        {
          method: 'POST',
          path: '/to-or-from-own-premises',
          ...toFromFarmPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
