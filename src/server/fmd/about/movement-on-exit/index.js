import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class MovementOnExitPage extends ExitPage {
  urlPath = '/fmd/about-the-movement-or-activity/movement-on-exit-page'
  pageTitle = 'You can only move live animals onsite'
  view = 'fmd/about/movement-on-exit/index'
  key = 'movementOnExit'
  sectionKey = 'about'
}
export const movementOnExitPage = new MovementOnExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const movementOnExit = new PageController(movementOnExitPage, {
  methods: ['GET']
}).plugin()
