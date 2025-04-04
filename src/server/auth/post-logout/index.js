import { postLogoutController } from '../post-logout/controller.js'

const postLogout = {
  plugin: {
    name: 'post-logout',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/auth/post-logout',
          ...postLogoutController
        }
      ])
    }
  }
}

export { postLogout }
