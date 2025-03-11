import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { Page } from '../../common/model/page/page-model.js'

export class EquipmentAnySharedPage extends Page {
  urlPath = '/biosecurity/equipment-any-shared'
}

export const equipmentAnySharedPage = new EquipmentAnySharedPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const buildingsAnyShared = new PageController(
  equipmentAnySharedPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
