import { config } from '~/src/config/config.js'

export const isAuthenticated = (req) => {
  return config.get('featureFlags').authEnabled && req.auth.isAuthenticated
}
