import { logoutController } from '~/src/server/auth/logout/controller.js'

const logout = {
  plugin: {
    name: 'logout',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/logout',
          ...logoutController
        }
      ])
    }
  }
}

export { logout }
