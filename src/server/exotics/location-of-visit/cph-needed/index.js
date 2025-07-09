import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class CphNeededExitPage extends ExitPage {
  urlPath = '/exotics/location-of-visit/cph-needed'
  pageTitle = 'You need a cph number to continue your application'
  view = 'exotics/location-of-visit/cph-needed/index'
  key = 'cphNeeded'
  sectionKey = 'locationOfVisit`'
}
export const cphNeededExitPage = new CphNeededExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphNeeded = new PageController(cphNeededExitPage, {
  methods: ['GET']
}).plugin()
