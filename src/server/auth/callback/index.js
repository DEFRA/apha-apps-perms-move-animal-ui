import { v4 as uuidv4 } from 'uuid'
import { addSeconds } from 'date-fns'

const auth = {
  plugin: {
    name: 'auth',
    register: (server) => {
      server.route({
        method: ['GET', 'POST'],
        path: '/auth/callback',
        options: {
          auth: 'defra-id'
        },
        handler: async (request, h) => {
          if (request.auth.isAuthenticated) {
            server.logger.info(
              'User journey: user has successfully authenticated via DEFRA CustomerIdentity'
            )

            const { profile } = request.auth.credentials
            const expiresInSeconds = request.auth.credentials.expiresIn
            const expiresInMilliSeconds = expiresInSeconds * 1000
            const expiresAt = addSeconds(new Date(), expiresInSeconds)

            const sessionId = uuidv4()
            await request.server.app.cache.set(sessionId, {
              ...profile,
              isAuthenticated: request.auth.isAuthenticated,
              token: request.auth.credentials.token,
              refreshToken: request.auth.credentials.refreshToken,
              expiresIn: expiresInMilliSeconds,
              expiresAt
            })

            request.cookieAuth.set({ sessionId })

            request.logger.info('User has been successfully authenticated')
          } else {
            server.logger.warn(
              'User journey: user was not authenticated via DEFRA CustomerIdentity'
            )
          }

          const redirect = request.yar.flash('referrer') ?? '/'

          return h.redirect(redirect)
        }
      })
    }
  }
}

export { auth }
