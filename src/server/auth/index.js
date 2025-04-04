import inert from '@hapi/inert'

import { login } from './login/index.js'
import { logout } from './logout/index.js'
import { auth } from './callback/index.js'
import { defraId } from '../common/helpers/auth/defra-id.js'
import { sessionCookie } from '../common/helpers/auth/session-cookie.js'
import { getUserSession } from '../common/helpers/auth/get-user-session.js'
import { dropUserSession } from '../common/helpers/auth/drop-user-session.js'
import { postLogout } from './post-logout/index.js'

const authPlugin = {
  plugin: {
    name: 'auth-router',
    register: async (server) => {
      server.decorate('request', 'getUserSession', getUserSession)
      server.decorate('request', 'dropUserSession', dropUserSession)

      server.app.cache = server.cache({
        cache: 'session',
        expiresIn: 10 * 1000 * 1000,
        segment: 'auth-session'
      })

      await server.register([inert])
      await server.register([defraId, sessionCookie])
      await server.register([auth, login, logout, postLogout])
    }
  }
}

export { authPlugin }
