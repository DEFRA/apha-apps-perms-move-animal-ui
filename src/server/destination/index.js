import { anotherDestination } from './another-destination/index.js'
import { destinationType } from './destination-type/index.js'
import { generalLicence } from './general-licence/index.js'
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
        anotherDestination
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
