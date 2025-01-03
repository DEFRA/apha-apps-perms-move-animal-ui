import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { home } from '~/src/server/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { origin } from './origin/index.js'
import { taskList } from './task-list/index.js'
import { taskListIncomplete } from './task-list-incomplete/index.js'
import { checkAnswers } from './check-answers/index.js'
import { licence } from './licence/index.js'
import { destination } from './destination/index.js'
import { privacyPolicy } from './privacy-policy/index.js'
import { submitSummary } from './task-list/page.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([
        home,
        privacyPolicy,
        origin,
        destination,
        licence,
        taskList,
        taskListIncomplete,
        checkAnswers,
        submitSummary
      ])

      // Static assets
      await server.register([serveStaticFiles])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
