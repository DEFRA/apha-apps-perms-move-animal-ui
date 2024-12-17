import { privacyPolicyController } from './controller.js'

/**
 * Sets up the routes used in the privacy policy page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const privacyPolicy = {
  plugin: {
    name: 'privacy-policy',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/privacy-policy',
          ...privacyPolicyController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
