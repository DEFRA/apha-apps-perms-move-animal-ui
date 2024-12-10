/**
 * Sets up the routes used in the receive your licence flow.
 * These routes are registered in src/server/router.js.
 */

import { licenceCheckAnswers } from './check-answers/index.js'
import { emailAddress } from './email-address/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licence = {
  plugin: {
    name: 'receiving-the-licence',
    async register(server) {
      await server.register([emailAddress, licenceCheckAnswers])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
