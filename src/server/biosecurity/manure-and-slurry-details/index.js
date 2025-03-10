import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { Page } from '../../common/model/page/page-model.js'

export class ManureAndSlurryDetailsPage extends Page {
  urlPath = '/biosecurity/manure-and-slurry-details'
}

export const manureAndSlurryDetailsPage = new ManureAndSlurryDetailsPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const manureAndSlurryDetails = new PageController(
  manureAndSlurryDetailsPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
