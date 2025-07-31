import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class AboutMovementExitPage extends ExitPage {
  urlPath = '/exotics/about-the-movement/can-not-use-service'
  pageTitle = 'You cannot apply for a licence for this movement'
  view = 'exotics/about/about-movement-exit-page/index'
  key = 'exitPageAboutMovement'
  sectionKey = 'about'
}
export const aboutMovementExitPage = new AboutMovementExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const aboutMovementExit = new PageController(aboutMovementExitPage, {
  methods: ['GET']
}).plugin()
