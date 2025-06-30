import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class AfuToAfuExitPage extends ExitPage {
  urlPath = '/destination/can-not-use-service-afu-only-off'
  pageTitle = 'This service is not available for your movement type'
  view = `tb/destination/afu-to-afu-exit-page/index`
  key = 'ExitPageAfuToAfu'
  sectionKey = 'destination'
}
export const afuToAfuExitPage = new AfuToAfuExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const afuToAfuExit = new PageController(afuToAfuExitPage, {
  methods: ['GET']
}).plugin()
