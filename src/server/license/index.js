/**
 * Sets up the routes used in the receive your license flow.
 * These routes are registered in src/server/router.js.
 */

import { licenseCheckAnswers } from './check-answers/index.js'
import { emailAddress } from './email-address/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licence = {
  plugin: {
    name: 'receiving-the-licence',
    async register(server) {
      await server.register([emailAddress, licenseCheckAnswers], {
        routes: {
          prefix: '/receiving-the-licence'
        }
      })
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
