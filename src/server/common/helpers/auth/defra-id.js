import Wreck from '@hapi/wreck'
import jwt from '@hapi/jwt'
import bell from '@hapi/bell'
import { config } from '~/src/config/config.js'

/**
 * @typedef {{[key: string]: string}} OidcConf
 */

const defraId = {
  plugin: {
    name: 'defra-id',
    register: async (server) => {
      const oidcConfigurationUrl =
        config.get('auth').defraIdOidcConfigurationUrl
      const serviceId = config.get('auth').defraIdServiceId
      const clientId = config.get('auth').defraIdClientId
      const clientSecret = config.get('auth').defraIdClientSecret
      const authCallbackUrl = config.get('appBaseUrl') + '/auth/callback'

      await server.register(bell)

      const resp = await Wreck.get(oidcConfigurationUrl)

      /** @type {OidcConf} */
      const oidcConf = JSON.parse(resp.payload.toString())

      server.auth.strategy('defra-id', 'bell', {
        location: () => {
          return authCallbackUrl
        },
        provider: {
          name: 'https://defra-id.gov.uk',
          protocol: 'oauth2',
          useParamsAuth: true,
          auth: oidcConf.authorization_endpoint,
          token: oidcConf.token_endpoint,
          scope: [
            'openid',
            'offline_access',
            config.get('auth').defraIdClientId
          ],
          profile: (credentials, params) => {
            const payload = jwt.token.decode(credentials.token).decoded.payload
            const displayName = [payload.firstName, payload.lastName]
              .filter((part) => part)
              .join(' ')

            credentials.profile = {
              ...payload,
              id: payload.sub,
              displayName,
              idToken: params.id_token,
              tokenUrl: oidcConf.token_endpoint,
              logoutUrl: oidcConf.end_session_endpoint
            }
          }
        },
        password: config.get('session').cookie.password,
        clientId,
        clientSecret,
        cookie: 'bell-defra-id',
        isSecure: false,
        providerParams: {
          serviceId
        }
      })
    }
  }
}

export { defraId }
