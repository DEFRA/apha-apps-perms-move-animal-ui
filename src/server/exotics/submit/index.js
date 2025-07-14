/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submit = {
  plugin: {
    name: 'exotics-submit',
    async register(server) {
      await server.register([])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
