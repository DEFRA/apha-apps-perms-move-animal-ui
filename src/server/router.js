import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { home } from '~/src/server/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { taskList } from './task-list/index.js'
import { taskListIncomplete } from './task-list-incomplete/index.js'
import { privacyPolicy } from './privacy-policy/index.js'
import { submit } from './submit/index.js'
import { submitSummary } from './check-answers/index.js'
import { cookiesPolicy } from './cookies-policy/index.js'
import { accessibilityStatement } from './accessibility/index.js'
import { ApplicationModel } from './common/model/application/application.js'
import { s3Client } from './common/plugins/s3/index.js'
import { authPlugin } from './auth/index.js'
import { config } from '../config/config.js'
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
          ApplicationModel.implementedSections.map(
            (section) => section.config.plugin
          )
        ),

        // Static assets
        server.register([serveStaticFiles])
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
