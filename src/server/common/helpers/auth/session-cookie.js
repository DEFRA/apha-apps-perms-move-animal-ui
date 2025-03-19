import authCookie from '@hapi/cookie'
import { isPast, parseISO, subMinutes } from 'date-fns'

import {
  removeUserSession,
  updateUserSession
} from '~/src/server/common/helpers/auth/user-session.js'
import { refreshAccessToken } from './refresh-token.js'
import { config } from '~/src/config/config.js'

const sessionCookie = {
  plugin: {
    name: 'user-session',
    register: async (server) => {
      await server.register(authCookie)

      server.auth.strategy('session', 'cookie', {
        cookie: {
          name: 'userSession',
          path: '/',
          password: config.get('session').cookie.password,
          isSecure: config.get('isProduction'),
          ttl: config.get('session').cookie.ttl
        },
        keepAlive: true,
        validate: async (request, session) => {
          const authedUser = await request.getUserSession()

          const tokenHasExpired = isPast(
            subMinutes(parseISO(authedUser.expiresAt), 1)
          )

          if (tokenHasExpired) {
            const response = await refreshAccessToken(request)
            const refreshAccessTokenJson = await response.json()

            if (!response.ok) {
              removeUserSession(request)

              return { isValid: false }
            }

            const updatedSession = await updateUserSession(
              request,
              refreshAccessTokenJson
            )

            return {
              isValid: true,
              credentials: updatedSession
            }
          }

          const userSession = await server.app.cache.get(session.sessionId)

          if (userSession) {
            return {
              isValid: true,
              credentials: userSession
            }
          }

          return { isValid: false }
        }
      })

      server.auth.default('session')
    }
  }
}

export { sessionCookie }
