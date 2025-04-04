/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { calvesUnder42DaysOld } from './calves-under-42-days-old/index.js'
import { identificationSummary } from './check-answers/index.js'
import { earTags } from './ear-tags/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const identification = {
  plugin: {
    name: 'animal-identification',
    async register(server) {
      await server.register([
        calvesUnder42DaysOld,
        earTags,
        identificationSummary
      ])
    }
  }
}
