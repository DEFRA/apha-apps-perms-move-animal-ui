import { tbSubmitConfirmation } from './confirmation/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbSubmit = {
  plugin: {
    name: 'tb-submit',
    async register(server) {
      await server.register([tbSubmitConfirmation])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
