import * as lodash from 'lodash'

import { provideAuthedUser } from '~/src/server/auth/logout/prerequisites/provide-authed-user.js'

const logoutController = {
  options: {
    pre: [provideAuthedUser]
  },
  handler: (request, h) => {
    const authedUser = request.pre.authedUser

    if (lodash.isEmpty(authedUser)) {
      return h.redirect('/')
    }

    const referrer = request.info.referrer
    const idTokenHint = authedUser.idToken

    const logoutUrl = encodeURI(
      `${authedUser.logoutUrl}?id_token_hint=${idTokenHint}&post_logout_redirect_uri=${referrer}`
    )

    request.dropUserSession()
    request.cookieAuth.clear()

    return h.redirect(logoutUrl)
  }
}

export { logoutController }
