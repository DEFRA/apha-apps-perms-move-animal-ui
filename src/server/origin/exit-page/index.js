import { exitPageController } from './controller.js'
import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */

export class OriginExitPage extends ExitPage {
  urlPath = '/exit-page'
}
export const exitPage = new OriginExitPage()

export const exit = {
  plugin: {
    name: 'exitPage',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: exitPage.urlPath,
          ...exitPageController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
