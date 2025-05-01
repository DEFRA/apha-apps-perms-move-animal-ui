import { config } from '~/src/config/config.js'
import {
  taskListGetController,
  taskListPostController
} from '~/src/server/task-list/controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */
export const taskList = {
  plugin: {
    name: 'task-list',

    register(server) {
      const authRequired = config.get('featureFlags').authRequired
      const authEnabaled = config.get('featureFlags').authEnabled

      let routeOptions = {}

      if (authEnabaled && !authRequired) {
        routeOptions = {
          options: {
            auth: {
              strategy: 'session',
              mode: authRequired ? 'required' : 'optional'
            }
          }
        }
      }

      server.route([
        {
          method: 'GET',
          path: '/task-list',
          ...taskListGetController,
          ...routeOptions
        },
        {
          method: 'POST',
          path: '/task-list',
          ...taskListPostController,
          ...routeOptions
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
