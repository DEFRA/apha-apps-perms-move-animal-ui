import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { Page } from '../../common/model/page/page-model.js'

export class OtherRestockReasonPage extends Page {
  urlPath = '/destination/restocking-additional-info-reason-other'
  sectionKey = 'destination'
}

export const otherRestockReasonPage = new OtherRestockReasonPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const restockReason = new PageController(otherRestockReasonPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
