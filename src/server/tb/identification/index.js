/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { calvesUnder42DaysOld } from './calves-under-42-days-old/index.js'
import { identificationWarning } from './warning/index.js'
import { earTags } from './ear-tags/index.js'
import { oldestCalfDob } from './oldest-calf-dob/index.js'
import { identificationSummary } from './summary/index.js'
import { testingDates } from './testing-dates/index.js'
import { earTagsCalves } from './ear-tags-calves/index.js'
import { animals42DaysOldOrOlder } from './animals-42-days-old-or-older/index.js'
import { earTagsOver42DaysOld } from './ear-tags-over-42-days-old/index.js'

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
        earTagsOver42DaysOld,
        earTagsCalves,
        identificationSummary,
        oldestCalfDob,
        identificationWarning,
        animals42DaysOldOrOlder
      ])
    }
  }
}
