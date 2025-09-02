import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class CphNeededExitPage extends ExitPage {
  urlPath = '/fmd/movement-origin/animal-location/cph-needed'
  pageTitle = 'You need a cph number to continue your application'
  view = 'fmd/origin/cph-needed/index'
  key = 'cphNeeded'
  sectionKey = 'origin`'
}
export const cphNeededExitPage = new CphNeededExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphNeeded = new PageController(cphNeededExitPage, {
  methods: ['GET']
}).plugin()
