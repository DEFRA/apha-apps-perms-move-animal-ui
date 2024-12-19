/**
 * @satisfies {Partial<ServerRoute>}
 */
export const privacyPolicyController = {
  handler(_request, h) {
    return h.view('privacy-policy/index', {
      pageTitle: 'Privacy Policy',
      heading: 'Privacy Policy'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
