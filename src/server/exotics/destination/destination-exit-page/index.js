import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class DestinationExitPage extends ExitPage {
  urlPath = '/exotics/movement-destination/can-not-use-service'
  pageTitle = 'You cannot apply for a licence for this movement'
  view = 'exotics/destination/destination-exit-page/index'
  key = 'exitPageDestination'
  sectionKey = 'destination'
}
export const destinationExitPage = new DestinationExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationExit = new PageController(destinationExitPage, {
  methods: ['GET']
}).plugin()
