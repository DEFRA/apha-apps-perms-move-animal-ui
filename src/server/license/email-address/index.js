import {
  getEmailAddressController,
  postEmailAddressController
} from './controller.js'

/**
 * Sets up the routes used in the cph number page.
 * These routes are registered in src/server/router.js.
 */

const path = 'licence-enter-email-address'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const emailAddress = {
  plugin: {
    name: path,
    register(server) {
      server.route([
        {
          method: 'GET',
          path: `/${path}`,
          ...getEmailAddressController
        },
        {
          method: 'POST',
          path: `/${path}`,
          ...postEmailAddressController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
