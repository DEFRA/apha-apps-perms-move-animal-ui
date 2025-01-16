import { cookiesPolicyController } from './controller.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cookiesPolicy = {
  plugin: {
    name: 'cookies-policy',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/cookies',
          ...cookiesPolicyController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
