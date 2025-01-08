import { submitConfirmation } from './confirmation/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submit = {
  plugin: {
    name: 'submit',
    async register(server) {
      await server.register([submitConfirmation])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
