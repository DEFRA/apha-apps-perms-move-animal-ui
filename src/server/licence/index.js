/**
 * Sets up the routes used in the receive your licence flow.
 * These routes are registered in src/server/router.js.
 */

import { licenceSummary } from './check-answers/index.js'
import { emailAddress } from './email-address/index.js'
import { fullName } from './fullName/index.js'
import { postExit } from './postExitPage/index.js'
import { receiveMethod } from './receiveMethod/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licence = {
  plugin: {
    name: 'receiving-the-licence',
    async register(server) {
      await server.register([
        fullName,
        receiveMethod,
        postExit,
        emailAddress,
        licenceSummary
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
