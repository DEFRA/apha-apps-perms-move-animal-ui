/**
 * Sets up the routes used in the submit confirmation page.
 * These routes are registered in src/server/router.js.
 */

import { submitConfirmationController } from './controller.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submitConfirmation = {
  plugin: {
    name: 'confirmation',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/submit/confirmation',
          ...submitConfirmationController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
