import { getAuthOptions } from '../../helpers/auth/toggles-helper.js'
import { taskListIncompleteGetController } from './controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const taskListIncomplete = {
  plugin: {
    name: 'task-list-incomplete',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/task-list-incomplete',
          options: {
            ...getAuthOptions(false)
          },
          ...taskListIncompleteGetController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
