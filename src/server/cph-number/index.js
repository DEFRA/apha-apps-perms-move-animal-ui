import { getController, postController } from './controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

const path = 'cph-number'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphNumber = {
  plugin: {
    name: path,
    register(server) {
      server.route([
        {
          method: 'GET',
          path: `/${path}`,
          ...getController
        },
        {
          method: 'POST',
          path: `/${path}`,
          ...postController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
