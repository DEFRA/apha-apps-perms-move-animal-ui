import { additionalInfo } from './additional-info/index.js'
import { contactTbRestrictedFarm } from './contact-tb-restricted-farm/index.js'
import { destinationFarmAddress } from './destination-farm-address/index.js'
import { destinationFarmCph } from './destination-farm-cph/index.js'
import { destinationType } from './destination-type/index.js'
import { generalLicence } from './general-licence/index.js'
import { quantityHalfHerd } from './quantity-half-herd/index.js'
import { reasonForMovement } from './reason-for-movement/index.js'
import { destinationSummary } from './summary/index.js'
import { howManyAnimals } from './how-many-animals/index.js'
import { howManyAnimalsMaximum } from './how-many-animals-maximum/index.js'
import { isolationUnitExit } from './isolation-unit-exit-page/index.js'

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
        contactTbRestrictedFarm,
        destinationFarmCph,
        destinationFarmAddress,
        reasonForMovement,
        additionalInfo,
        quantityHalfHerd,
        howManyAnimals,
        howManyAnimalsMaximum,
        isolationUnitExit
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
