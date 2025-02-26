import { anotherDestination } from './another-destination/index.js'
import { contactTbRestrictedFarm } from './contact-tb-restricted-farm/index.js'
import { destinationFarmAddress } from './destination-farm-address/index.js'
import { destinationFarmCph } from './destination-farm-cph/index.js'
import { destinationType } from './destination-type/index.js'
import { generalLicence } from './general-licence/index.js'
import { reasonForMovement } from './reason-for-movement/index.js'
import { destinationSummary } from './summary/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destination = {
  plugin: {
    name: 'destination',
    async register(server) {
      await server.register([
        destinationType,
        generalLicence,
        destinationSummary,
        anotherDestination,
        contactTbRestrictedFarm,
        destinationFarmCph,
        destinationFarmAddress,
        reasonForMovement
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
