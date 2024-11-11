/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/index', {
      pageTitle: 'Apply for an animal disease movement licence',
      heading: 'Apply for an animal disease movement licence'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
