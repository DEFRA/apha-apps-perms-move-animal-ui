import { ExitPage } from '../../common/model/page/exit-page-model.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class IsolationUnitExitPage extends ExitPage {
  urlPath = '/destination/tb-isolation-unit'
  pageTitle = 'This service is not available for your movement type'
  view = `destination/isolation-unit-exit-page/index`
  key = 'ExitPageIsolationUnit'
  sectionKey = 'destination'
}
export const isolationUnitExitPage = new IsolationUnitExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const isolationUnitExit = new PageController(isolationUnitExitPage, {
  methods: ['GET']
}).plugin()
