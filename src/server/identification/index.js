/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { earTags } from './ear-tags/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const identification = {
  plugin: {
    name: 'animal-identification',
    async register(server) {
      await server.register([earTags])
    }
  }
}
