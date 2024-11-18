/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/index', {
      pageTitle: 'Apply for a Bovine Tuberculosis (TB) movement licence',
      heading: 'Apply for a Bovine Tuberculosis (TB) movement licence'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
