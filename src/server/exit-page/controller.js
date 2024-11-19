/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
export const exitPageController = {
  handler(_request, h) {
    return h.view('exit-page/index', {
      pageTitle: 'Apply for an animal disease movement licence',
      heading: 'This service is not available for your movement type'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */