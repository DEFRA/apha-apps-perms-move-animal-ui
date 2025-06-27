import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class OriginContactTbRestrictedFarmPage extends ExitPage {
  urlPath = '/origin/contact-the-tb-restricted-farm'
  pageTitle =
    'You need to contact the TB restricted farm the animals are moving onto'

  view = `tb/origin/contact-tb-restricted-farm/index`
  sectionKey = 'origin'
  key = 'OriginContactTbRestrictedFarmPage'
}
export const originContactTbRestrictedFarmPage =
  new OriginContactTbRestrictedFarmPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const originContactTbRestrictedFarm = new PageController(
  originContactTbRestrictedFarmPage,
  {
    methods: ['GET']
  }
).plugin()
