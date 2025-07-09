import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { home } from '~/src/server/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { taskList } from './tb/task-list/index.js'
import { taskListIncomplete } from './tb/task-list-incomplete/index.js'
import { privacyPolicy } from './privacy-policy/index.js'
import { submit } from './tb/submit/index.js'
import { submitSummary } from './tb/check-answers/index.js'
import { cookiesPolicy } from './cookies-policy/index.js'
import { accessibilityStatement } from './accessibility/index.js'
import { TbApplicationModel } from './tb/application.js'
import { s3Client } from './common/plugins/s3/index.js'
import { authPlugin } from './auth/index.js'
import { config } from '../config/config.js'
import { ExoticsApplicationModel } from './exotics/application.js'
import { exoticsTaskList } from './exotics/task-list/index.js'
import { reason } from './exotics/visit-details/reason/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      // // Add the auth stuff
      if (config.get('featureFlags').authEnabled) {
        await server.register(authPlugin)
      }

      // do all server registers async of each other (up to 8x faster)
      await Promise.all([
        server.register([inert]),

        // Decorator services
        server.register([s3Client]),

        // Health-check route. Used by platform to check if service is running, do not remove!
        server.register([health]),

        // Application specific routes, add your own routes here
        server.register([
          home,
          privacyPolicy,
          cookiesPolicy,
          accessibilityStatement,
          taskList,
          taskListIncomplete,
          submit,
          submitSummary
        ]),

        // Add routes for the visible sections in the application
        server.register(
          TbApplicationModel.implementedSections.map(
            (section) => section.config.plugin
          )
        ),

        // Static assets
        server.register([serveStaticFiles])
      ])

      if (config.get('featureFlags').exoticsJourney) {
        await server.register([exoticsTaskList])
        await server.register([reason])
        await server.register(
          ExoticsApplicationModel.implementedSections.map(
            (section) => section.config.plugin
          )
        )
      }
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
