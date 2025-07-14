import { exoticsSubmitConfirmation } from './confirmation/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const submit = {
  plugin: {
    name: 'exotics-submit',
    async register(server) {
      await server.register([exoticsSubmitConfirmation])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
