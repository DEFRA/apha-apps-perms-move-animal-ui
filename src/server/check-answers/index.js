import {
  checkAnswersGetController,
  checkAnswersPostController
} from '~/src/server/check-answers/controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const checkAnswers = {
  plugin: {
    name: 'check-answers',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/submit/check-answers',
          ...checkAnswersGetController
        },
        {
          method: 'POST',
          path: '/submit/check-answers',
          ...checkAnswersPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
