import { destinationType } from './destination-type/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destination = {
  plugin: {
    name: 'destination',
    async register(server) {
      await server.register([destinationType])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
