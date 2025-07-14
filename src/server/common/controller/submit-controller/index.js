import { confirimationPageFactory } from './confirmation/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submit = {
  plugin: {
    name: 'tb-submit',
    async register(server) {
      await server.register([confirimationPageFactory('tb')])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
