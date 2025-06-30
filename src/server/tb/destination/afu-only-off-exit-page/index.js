import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class AfuOnlyOffExitPage extends ExitPage {
  urlPath = '/destination/can-not-use-service-afu-only-off'
  pageTitle = 'This service is not available for your movement type'
  view = `tb/destination/afu-only-off-exit-page/index`
  key = 'ExitPageOnlyOff'
  sectionKey = 'destination'
}
export const afuOnlyOffExitPage = new AfuOnlyOffExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const afuOnlyOffExit = new PageController(afuOnlyOffExitPage, {
  methods: ['GET']
}).plugin()
