import { Page } from '../../common/model/page/page-model.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { DestinationSummaryPage } from '../summary/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class DestinationGeneralLicencePage extends Page {
  urlPath = '/destination/use-general-licence'
  view = 'destination/general-licence/index'
  key = 'use-general-licence'
  sectionKey = 'destination'

  pageTitle = 'Check if you have a general licence'
  pageHeading = 'Check if you have a general licence'

  nextPage() {
    return new DestinationSummaryPage()
  }

  get viewProps() {
    return {
      continueUrl: this.nextPage().urlPath
    }
  }
}
export const destinationGeneralLicencePage = new DestinationGeneralLicencePage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const generalLicence = new PageController(
  new DestinationGeneralLicencePage()
).plugin()
