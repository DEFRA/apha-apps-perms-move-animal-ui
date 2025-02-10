import { biosecuritySummary } from './check-answers/index.js'
import { keptSeparately } from './kept-separately/index.js'
import { grazing } from './grazing/index.js'
import { lastGrazed } from './last-grazed/index.js'
import { manureAndSlurry } from './manure-and-slurry/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const biosecurity = {
  plugin: {
    name: 'biosecurity',
    async register(server) {
      await server.register([
        keptSeparately,
        grazing,
        lastGrazed,
        manureAndSlurry,
        biosecuritySummary
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
