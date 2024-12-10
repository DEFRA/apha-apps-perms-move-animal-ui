import { Page } from '../../common/model/page/page-model.js'
import {
  licenceCheckAnswersGetController,
  licenceCheckAnswersPostController
} from './controller.js'

/**
 * Sets up the routes used in the summary page.
 * These routes are registered in src/server/router.js.
 */

export class LicenceCheckAnswersPage extends Page {
  urlPath = '/receiving-the-licence/check-answers'
}

export const licenceCheckAnswersPage = new LicenceCheckAnswersPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licenceCheckAnswers = {
  plugin: {
    name: 'licence-check-answers',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: licenceCheckAnswersPage.urlPath,
          ...licenceCheckAnswersGetController
        },
        {
          method: 'POST',
          path: licenceCheckAnswersPage.urlPath,
          ...licenceCheckAnswersPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
