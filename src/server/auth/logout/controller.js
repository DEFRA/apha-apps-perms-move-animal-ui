import { config } from '~/src/config/config.js'
import { provideAuthedUser } from '~/src/server/auth/logout/prerequisites/provide-authed-user.js'

const logoutController = {
  options: {
    pre: [provideAuthedUser]
  },
  handler: (request, h) => {
    const authedUser = request.pre.authedUser

    if (!authedUser.isAuthenticated) {
      return h.redirect('/')
    }

    const idTokenHint = authedUser.idToken
    const redirectUri = `${config.get('appBaseUrl')}/auth/post-logout`

    const logoutUrl = encodeURI(
      `${authedUser.logoutUrl}?id_token_hint=${idTokenHint}&post_logout_redirect_uri=${redirectUri}`
    )

    request.dropUserSession()
    request.cookieAuth.clear()

    return h.redirect(logoutUrl)
  }
}

export { logoutController }
