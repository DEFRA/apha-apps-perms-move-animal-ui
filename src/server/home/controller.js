import { config } from '~/src/config/config.js'

/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
export const homeController = {
  handler(_request, h) {
    let template = 'home/index'

    const { biosecurity } = config.get('featureFlags')
    if (biosecurity) {
      template += '_v2'
    }

    return h.view(template, {
      pageTitle: config.get('serviceName'),
      heading: 'Apply for a Bovine Tuberculosis (TB) movement licence'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
