import {
  licenseCheckAnswersGetController,
  licenseCheckAnswersPostController
} from './controller.js'

/**
 * Sets up the routes used in the summary page.
 * These routes are registered in src/server/router.js.
 */

const path = 'check-answers'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licenseCheckAnswers = {
  plugin: {
    name: 'license-check-answers',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: `/${path}`,
          ...licenseCheckAnswersGetController
        },
        {
          method: 'POST',
          path: `/${path}`,
          ...licenseCheckAnswersPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
