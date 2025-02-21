import { onOffFarm } from './on-off-farm/index.js'
import { cphNumber } from './cph-number/index.js'
import { address } from './address/index.js'
import { originSummary } from './summary/index.js'
import { exit } from './exit-page/index.js'
import { originType } from './origin-type/index.js'
import { premisesType } from './premises-type-exit-page/index.js'
import { originFarmCph } from './origin-farm-cph/index.js'
import { originFarmAddress } from './origin-farm-address/index.js'
import { fiftyPercentWarning } from './fifty-percent-warning/index.js'
import { country } from './country/index.js'
import { originContactTbRestrictedFarm } from './contact-tb-restricted-farm/index.js'
import { importCph } from './import-cph/index.js'

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
        originFarmCph,
        importCph,
        originFarmAddress,
        address,
        originSummary,
        country,
        exit,
        premisesType,
        fiftyPercentWarning,
        originContactTbRestrictedFarm
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
