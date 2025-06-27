import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class ContactTbRestrictedFarmPage extends ExitPage {
  urlPath = '/destination/contact-the-tb-restricted-farm'
  pageTitle =
    'You need to contact the TB restricted farm the animals are moving onto'

  view = `tb/destination/contact-tb-restricted-farm/index`
  sectionKey = 'destination'
  key = 'ContactTbRestrictedFarmPage'
}
export const contactTbRestrictedFarmPage = new ContactTbRestrictedFarmPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const contactTbRestrictedFarm = new PageController(
  contactTbRestrictedFarmPage,
  {
    methods: ['GET']
  }
).plugin()
