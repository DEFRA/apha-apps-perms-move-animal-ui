import { uploadPlan } from './upload-plan/index.js'
import { uploadProgress } from './upload-progress/index.js'
import { biosecurityPlanSummary } from './check-answers/index.js'
import { sizeError } from './size-error/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const biosecurityPlan = {
  plugin: {
    name: 'biosecurity-map',
    async register(server) {
      await server.register([
        uploadPlan,
        uploadProgress,
        biosecurityPlanSummary,
        sizeError
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
