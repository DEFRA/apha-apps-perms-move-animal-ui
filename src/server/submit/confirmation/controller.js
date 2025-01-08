/**
 * @satisfies {Partial<ServerRoute>}
 */
export const submitConfirmationController = {
  handler(_request, h) {
    return h.view('submit/confirmation/index', {
      pageTitle: 'Your animal disease movement licence application'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
