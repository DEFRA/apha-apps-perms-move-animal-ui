import {
  taskListGetController,
  taskListPostController
} from '~/src/server/task-list/controller.js'
import { getAuthOptions } from '../common/helpers/auth/toggles-helper.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */
export const taskList = {
  plugin: {
    name: 'task-list',

    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/task-list',
          ...taskListGetController,
          options: { ...getAuthOptions() }
        },
        {
          method: 'POST',
          path: '/task-list',
          ...taskListPostController,
          options: { ...getAuthOptions() }
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
