import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { ExitPage } from '../../common/model/page/exit-page-model.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class AnotherDestinationExitPage extends ExitPage {
  pageTitle = 'This service is not available for your movement type'
  urlPath = `/destination/another-destination`
  view = `destination/another-destination/index`
}
export const anotherDestinationPage = new AnotherDestinationExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const anotherDestination = new PageController(anotherDestinationPage, {
  methods: ['GET']
}).plugin()
