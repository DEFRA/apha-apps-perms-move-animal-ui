import { Page } from '../../common/model/page/page-model.js'
import { PageController } from '../../common/controller/page-controller/page-controller.js'

export class EarTagsCalvesPage extends Page {
  sectionKey = 'identification'
  urlPath = `/${this.sectionKey}/enter-ear-tags-calves`
}

export class EarTagsCalvesController extends PageController {
  pluginName = 'ear-tags-calves'
}

export const earTagsCalvesPage = new EarTagsCalvesPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const identificationWarning = new EarTagsCalvesController(
  earTagsCalvesPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
