import { healthController } from '~/src/server/health/controller.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const health = {
  plugin: {
    name: 'health',
    register(server) {
      server.route({
        options: {
          auth: false
        },
        method: 'GET',
        path: '/health',
        ...healthController
      })
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
