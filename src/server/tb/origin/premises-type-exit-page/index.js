import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class ExitPagePremisesType extends ExitPage {
  urlPath = '/origin/can-not-use-service-premises-type'
  pageTitle = 'This service is not available for your movement type'
  view = `tb/origin/premises-type-exit-page/index`
  key = 'ExitPagePremisesType'
  sectionKey = 'origin'
}
export const exitPagePremisesType = new ExitPagePremisesType()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const premisesType = new PageController(exitPagePremisesType, {
  methods: ['GET']
}).plugin()
