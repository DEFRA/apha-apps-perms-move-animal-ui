import {
  onOffFarmGetController,
  onOffFarmPostController
} from './controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const onOffFarm = {
  plugin: {
    name: 'origin-to-or-from-own-premises',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/to-or-from-own-premises',
          ...onOffFarmGetController
        },
        {
          method: 'POST',
          path: '/to-or-from-own-premises',
          ...onOffFarmPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
