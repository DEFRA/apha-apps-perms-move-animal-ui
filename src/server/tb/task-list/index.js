import {
  taskListGetController,
  taskListPostController
} from '~/src/server/tb/task-list/controller.js'
import { getAuthOptions } from '../../common/helpers/auth/toggles-helper.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const taskList = {
  plugin: {
    name: 'task-list',

    register(server) {
      const options = {
        ...getAuthOptions(false)
      }

      server.route([
        {
          method: 'GET',
          path: '/task-list',
          ...taskListGetController,
          options
        },
        {
          method: 'POST',
          path: '/task-list',
          ...taskListPostController,
          options
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
