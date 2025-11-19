import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { home as tbHome } from '~/src/server/tb/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { tbTaskList } from './tb/task-list/index.js'
import { tbTaskListIncomplete } from './tb/task-list-incomplete/index.js'
import { privacyPolicy } from './privacy-policy/index.js'
import { tbSubmit } from './tb/submit/index.js'
import { cookiesPolicy } from './cookies-policy/index.js'
import { accessibilityStatement } from './accessibility/index.js'
import { TbApplicationModel } from './tb/application.js'
import { s3Client } from './common/plugins/s3/index.js'
import { authPlugin } from './auth/index.js'
import { config } from '../config/config.js'
import { ExoticsApplicationModel } from './exotics/application.js'
import { exoticsTaskList } from './exotics/task-list/index.js'
import { exoticsSubmitSummary } from './exotics/check-answers/index.js'
import { tbSubmitSummary } from './tb/check-answers/index.js'
import { taskListIncomplete as exoticsTaskListIncomplete } from './exotics/task-list-incomplete/index.js'
import { exoticsSubmit } from './exotics/submit/index.js'
import { home as exoticsHome } from './exotics/home/index.js'
import { home as fmdHome } from './fmd/home/index.js'
import { fmdTaskList } from './fmd/task-list/index.js'
import { fmdSubmitSummary } from './fmd/check-answers/index.js'
import { taskListIncomplete as fmdTaskListIncomplete } from './fmd/task-list-incomplete/index.js'
import { fmdSubmit } from './fmd/submit/index.js'
import { FmdApplicationModel } from './fmd/application.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const router = {
  plugin: {
    name: 'router',
    async register(server) {
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
          tbHome,
          privacyPolicy,
          cookiesPolicy,
          accessibilityStatement
        ]),

        server.register([
          tbTaskList,
          tbTaskListIncomplete,
          tbSubmit,
          tbSubmitSummary
        ]),

        // Add routes for the visible sections in the application
        server.register(
          TbApplicationModel.implementedSections.map(
            (section) => section.config.plugin
          ).filter(Boolean)
        ),

        // Static assets
        server.register([serveStaticFiles])
      ])

      if (config.get('featureFlags').exoticsJourney) {
        await server.register([
          exoticsHome,
          exoticsTaskList,
          exoticsSubmitSummary,
          exoticsTaskListIncomplete,
          exoticsSubmit
        ])
        await server.register(
          ExoticsApplicationModel.implementedSections.map(
            (section) => section.config.plugin
          ).filter(Boolean)
        )
      }

      if (config.get('featureFlags').fmdJourney) {
        await server.register([
          fmdHome,
          fmdTaskList,
          fmdSubmitSummary,
          fmdTaskListIncomplete,
          fmdSubmit
        ])
        await server.register(
          FmdApplicationModel.implementedSections.map(
            (section) => section.config.plugin
          ).filter(Boolean)
        )
      }
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
