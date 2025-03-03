import { ExitPage } from '../../common/model/page/exit-page-model.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class DestinationNotSupportedPage extends ExitPage {
  urlPath = '/destination/can-not-use-service-tb16'
  pageTitle = 'This service does not currently support this movement type'

  view = `destination/not-supported-movement-type/index`
  sectionKey = 'destination'
  key = 'DestinationNotSupportedPage'
}
export const destinationNotSupportedPage = new DestinationNotSupportedPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const destinationNotSupported = new PageController(
  destinationNotSupportedPage,
  {
    methods: ['GET']
  }
).plugin()
