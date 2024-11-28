import {
  taskListGetController,
  taskListPostController
} from '~/src/server/task-list/controller.js'

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
      server.route([
        {
          method: 'GET',
          path: '/task-list',
          ...taskListGetController
        },
        {
          method: 'POST',
          path: '/task-list',
          ...taskListPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
