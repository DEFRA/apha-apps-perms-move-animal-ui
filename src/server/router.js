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
import { uploadPlan } from './biosecurity-map/upload-plan/index.js'
import { uploadProgress } from './biosecurity-map/upload-progress/index.js'
import { accessibilityStatement } from './accessibility/index.js'
import { ApplicationModel } from './common/model/application/application.js'
import { config } from '../config/config.js'

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
        cookiesPolicy,
        accessibilityStatement,
        taskList,
        taskListIncomplete,
        submit,
        submitSummary
      ])

      // Add routes for the visible sections in the application
      await server.register(
        ApplicationModel.visibleSections.map((section) => section.config.plugin)
      )

      // Static assets
      await server.register([serveStaticFiles])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
