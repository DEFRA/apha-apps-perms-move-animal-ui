import {
  originAddressGetController,
  originAddressPostController
} from './controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originAddress = {
  plugin: {
    name: 'origin-address',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/origin-address',
          ...originAddressGetController
        },
        {
          method: 'POST',
          path: '/origin-address',
          ...originAddressPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
