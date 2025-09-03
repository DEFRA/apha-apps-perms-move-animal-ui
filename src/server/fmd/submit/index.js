import { fmdSubmitConfirmation } from './confirmation/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const fmdSubmit = {
  plugin: {
    name: 'fmd-submit',
    async register(server) {
      await server.register([fmdSubmitConfirmation])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
