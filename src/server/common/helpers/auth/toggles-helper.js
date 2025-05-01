import { config } from '~/src/config/config.js'

export const getAuthOptions = (skipAuth) => {
  const authRequired = config.get('featureFlags').authRequired
  const authEnabled = config.get('featureFlags').authEnabled

  if (skipAuth) {
    return {
      auth: false
    }
  }

  if (authEnabled) {
    return {
      auth: {
        strategy: 'session',
        mode: authRequired ? 'required' : 'optional'
      }
    }
  }
}
