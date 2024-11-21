import crumb from '@hapi/crumb'
import { config } from '~/src/config/config.js'

export const csrfPlugin = {
  plugin: crumb,
  options: {
    cookieOptions: {
      isSecure: config.get('session.cookie.secure')
    }
  }
}
