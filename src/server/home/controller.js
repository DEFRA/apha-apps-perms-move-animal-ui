import { config } from '~/src/config/config.js'

/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
export const homeController = {
  options: {
    auth: false
  },
  handler(_request, h) {
    return h.view('home/index', {
      pageTitle: config.get('serviceName'),
      heading: 'Apply for a Bovine Tuberculosis (TB) movement licence'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
