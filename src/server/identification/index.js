/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { calvesUnder42DaysOld } from './calves-under-42-days-old/index.js'
import { earTags } from './ear-tags/index.js'
import { identificationSummary } from './summary/index.js'
import { testingDates } from './testing-dates/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const identification = {
  plugin: {
    name: 'animal-identification',
    async register(server) {
      await server.register([
        calvesUnder42DaysOld,
        testingDates,
        earTags,
        identificationSummary
      ])
    }
  }
}
