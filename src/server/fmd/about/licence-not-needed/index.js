import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class LicenceNotNeededExitPage extends ExitPage {
  urlPath = '/fmd/about-the-movement-or-activity/licence-not-needed'
  pageTitle = 'You do not need to apply for a licence to move milk'
  view = 'fmd/about/licence-not-needed/index'
  key = 'licenceNotNeeded'
  sectionKey = 'about`'
}
export const licenceNotNeededExitPage = new LicenceNotNeededExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const licenceNotNeeded = new PageController(licenceNotNeededExitPage, {
  methods: ['GET']
}).plugin()
