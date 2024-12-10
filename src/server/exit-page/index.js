import { exitPageController } from '~/src/server/exit-page/controller.js'
import { Page } from '../common/model/page/page-model.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */

export class ExitPage extends Page {
  urlPath = '/exit-page'
}
export const exitPage = new ExitPage()

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
