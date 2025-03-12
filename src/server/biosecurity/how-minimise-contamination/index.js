import { PageController } from '../../common/controller/page-controller/page-controller.js'
import { Page } from '../../common/model/page/page-model.js'

export class EquipmentHowMinimiseContaminationPage extends Page {
  urlPath = '/biosecurity/equipment-how-minimise-contamination'
}

export const equipmentHowMinimiseContaminationPage =
  new EquipmentHowMinimiseContaminationPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const buildingsAnyShared = new PageController(
  equipmentHowMinimiseContaminationPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
