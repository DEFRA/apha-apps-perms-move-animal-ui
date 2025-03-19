import inert from '@hapi/inert'

import { login } from './login/index.js'
import { logout } from './logout/index.js'
import { auth } from './callback/index.js'

const a11n = {
  plugin: {
    name: 'auth-router',
    register: async (server) => {
      await server.register([inert])
      await server.register([auth, login, logout])
    }
  }
}

export { a11n }
