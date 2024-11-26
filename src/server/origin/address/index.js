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
export const address = {
  plugin: {
    name: 'origin-address',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/address',
          ...originAddressGetController
        },
        {
          method: 'POST',
          path: '/address',
          ...originAddressPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
