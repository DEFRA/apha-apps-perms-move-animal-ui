import { uploadPlan } from './upload-plan/index.js'
import { uploadProgress } from './upload-progress/index.js'
import { biosecurityPlanSummary } from './check-answers/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const biosecurity = {
  plugin: {
    name: 'biosecurity-map',
    async register(server) {
      await server.register([
        uploadPlan,
        uploadProgress,
        biosecurityPlanSummary
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
