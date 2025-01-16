/**
 * @satisfies {Partial<ServerRoute>}
 */
export const cookiesPolicyController = {
  handler(_request, h) {
    return h.view('cookies-policy/index', {
      pageTitle: 'Cookies',
      heading: 'Cookies'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
