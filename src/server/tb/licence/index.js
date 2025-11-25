/**
 * Sets up the routes used in the receive your licence flow.
 * These routes are registered in src/server/router.js.
 */

import { licenceSummary } from './check-answers/index.js'
import { emailAddress } from './email-address/index.js'
import { fullNameFuture } from './full-name-future/index.js'
import { fullName } from './full-name/index.js'
import { yourName } from './your-name/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licence = {
  plugin: {
    name: 'receiving-the-licence',
    async register(server) {
      await server.register([
        fullName,
        fullNameFuture,
        yourName,
        emailAddress,
        licenceSummary
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
