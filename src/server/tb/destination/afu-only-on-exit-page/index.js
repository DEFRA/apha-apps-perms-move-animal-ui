import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class AfuOnlyOnExitPage extends ExitPage {
  urlPath = '/destination/can-not-use-service-afu-only-on'
  pageTitle = 'This service is not available for your movement type'
  view = `tb/destination/afu-only-on-exit-page/index`
  key = 'ExitPageOnlyOn'
  sectionKey = 'destination'
}
export const afuOnlyOnExitPage = new AfuOnlyOnExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const afuOnlyOnExit = new PageController(afuOnlyOnExitPage, {
  methods: ['GET']
}).plugin()
