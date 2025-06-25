/** @import { ServerRegisterPluginObject } from '@hapi/hapi' */

import { ExoticsApplicationModel } from './application.js'
import { exoticSubmitSummary } from './check-answers/index.js'
import { exoticTaskList } from './task-list/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exotics = {
  plugin: {
    name: 'exotics',
    async register(server) {
      await server.register([exoticTaskList, exoticSubmitSummary])

      await server.register(
        ExoticsApplicationModel.implementedSections.map(
          (section) => section.config.plugin
        )
      )
    }
  }
}
