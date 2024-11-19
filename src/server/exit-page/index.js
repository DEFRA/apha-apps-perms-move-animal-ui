import { exitPageController } from '~/src/server/exit-page/controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exitPage = {
  plugin: {
    name: 'exitPage',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/exit-page',
          ...exitPageController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
