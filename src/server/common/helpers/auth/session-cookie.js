import authCookie from '@hapi/cookie'
import { isPast, parseISO, subMinutes } from 'date-fns'

import {
  removeUserSession,
  updateUserSession
} from '~/src/server/common/helpers/auth/user-session.js'
import { refreshAccessToken } from './refresh-token.js'
import { config } from '~/src/config/config.js'
import { statusCodes } from '../../constants/status-codes.js'
import { storeReferrer } from './referrer.js'

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
          isSecure: config.get('session.cookie.secure'),
          ttl: config.get('session').cookie.ttl
        },
        redirectTo: (req) => {
          server.logger.info(
            'User journey: user has been sent to DEFRA CustomerIdentity for sign in'
          )

          storeReferrer(req)
          return '/auth/login'
        },
        keepAlive: true,
        validate: async (request, session) => {
          try {
            const authedUser = await request.getUserSession()

            const tokenHasExpired = isPast(
              subMinutes(parseISO(authedUser.expiresAt), 1)
            )

            if (tokenHasExpired) {
              server.logger.info(`Session expired, refreshing...`)
              const response = await refreshAccessToken(request)
              const refreshAccessTokenJson = JSON.parse(
                response.payload.toString()
              )

              if (response.res.statusCode !== statusCodes.OK) {
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
          } catch (e) {
            request.logger.warn('User session cache missing')
            return { isValid: false }
          }
        }
      })

      server.auth.default('session')
    }
  }
}

export { sessionCookie }
