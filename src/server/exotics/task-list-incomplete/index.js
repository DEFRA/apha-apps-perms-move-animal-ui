import { taskListIncompleteGetController } from '../../common/controller/task-list-incomplete/controller.js'
import { getAuthOptions } from '../../common/helpers/auth/toggles-helper.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const exoticsTaskListIncomplete = {
  plugin: {
    name: 'exotics-task-list-incomplete',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/exotics/task-list-incomplete',
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
