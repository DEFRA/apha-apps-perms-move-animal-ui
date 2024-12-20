import { onOffFarm } from './on-off-farm/index.js'
import { cphNumber } from './cph-number/index.js'
import { address } from './address/index.js'
import { originSummary } from './summary/index.js'
import { exit } from './exit-page/index.js'
import { originType } from './origin-type/index.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const origin = {
  plugin: {
    name: 'origin',
    async register(server) {
      await server.register([
        onOffFarm,
        originType,
        cphNumber,
        address,
        originSummary,
        exit
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
